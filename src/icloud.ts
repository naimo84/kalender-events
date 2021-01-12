import xmlParser = require('xml-js');
import icalExpander = require('ical-expander');
import { Config } from 'config';
import axios, { AxiosRequestConfig } from "axios";
import {KalenderEvents} from './lib';
import { iCalEvent, IKalenderEvent } from '../types/event';
import moment = require('moment');
const   https = require('https');
var debug = require('debug')('kalendar-events_icloud')

function process(reslist:IKalenderEvent[], start:any, end:any, ics:any, kalEv:KalenderEvents) {
    const cal = new icalExpander({ ics, maxIterations: 1000 });
    const events = cal.between(start.toDate(), end.toDate());

    for (let event of kalEv.convertEvents(events)) {
        reslist[event.uid.uid + event.uid.date] = event;
    }
}

function requestIcloudSecure(config: Config, start, end): Promise<any> {
    return new Promise((resolve, reject) => {
        const DavTimeFormat = 'YYYYMMDDTHHmms\\Z',
            url = config.url,
            user = config.username,
            pass = config.password,
            urlparts = /(https?)\:\/\/(.*?):?(\d*)?(\/.*\/?)/gi.exec(url),
            protocol = urlparts[1],
            host = urlparts[2],
            port = urlparts[3] || (protocol === "https" ? 443 : 80),
            path = urlparts[4];

        var xml = '<?xml version="1.0" encoding="utf-8" ?>\n' +
            '<C:calendar-query xmlns:D="DAV:" xmlns:C="urn:ietf:params:xml:ns:caldav">\n' +
            '  <D:prop>\n' +
            '    <C:calendar-data/>\n' +
            '  </D:prop>\n' +
            '  <C:filter>\n' +
            '    <C:comp-filter name="VCALENDAR">\n' +
            '      <C:comp-filter name="VEVENT">\n' +
            '        <C:time-range start="' + start.format(DavTimeFormat) + '" end="' + end.format(DavTimeFormat) + '" />\n' +
            '      </C:comp-filter>\n' +
            '    </C:comp-filter>\n' +
            '  </C:filter>\n' +
            '</C:calendar-query>';

        var options = {
            rejectUnauthorized: config.rejectUnauthorized,
            hostname: host,
            port: port,
            path: path,
            method: 'REPORT',
            headers: {
                "Content-type": "application/xml",
                "Content-Length": xml.length,
                "User-Agent": "calDavClient",
                "Connection": "close",
                "Depth": "1"
            }
        };

        if (user && pass) {
            var userpass = Buffer.from(user + ":" + pass).toString('base64');
            options.headers["Authorization"] = "Basic " + userpass;
        }

        var req = https.request(options, function (res) {
            var s = "";
            res.on('data', function (chunk) {
                s += chunk;
            });

            req.on('close', function () {

                try {
                    const json = JSON.parse(xmlParser.xml2json(s, { compact: true, spaces: 0 }));

                    resolve(json);
                } catch (e) {
                    console.error("Error parsing response", e)
                }
            });
        });

        req.end(xml);

        req.on('error', function (e) {
            console.error('problem with request: ' + e.message);
        });
    });
}

export async function ICloud(whenMoment:moment.Moment, config: Config, kalEv:KalenderEvents) {
    //@ts-ignore
    let start = whenMoment.clone().startOf('day').subtract(config.pastview, config.pastviewUnits);
    //@ts-ignore
    let end = whenMoment.clone().endOf('day').add(config.preview, config.previewUnits);

    if (config.pastviewUnits === 'days') {
        start = whenMoment.clone().startOf('day').subtract(config.pastview + 1, 'days');
    }
    if (config.previewUnits === 'days') {
        end = whenMoment.clone().endOf('day').add(config.preview, 'days');
    }

    const json = await requestIcloudSecure(config, start, end);

    var reslist:IKalenderEvent[] = [];
    if (json && json.multistatus && json.multistatus.response) {
        if (json.multistatus.response.propstat) {
            process(reslist, start, end, json.multistatus.response.propstat.prop['calendar-data']._cdata,kalEv);
        } else {
            json.multistatus.response.forEach((response:any) => process(reslist, start, end, response.propstat.prop['calendar-data']._cdata,kalEv));
        }
    }
    return reslist;
}