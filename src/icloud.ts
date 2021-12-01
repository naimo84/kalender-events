import xmlParser = require('xml-js');
import icalExpander = require('ical-expander');
import { Config } from './config';
import { KalenderEvents } from './lib';
import { IKalenderEvent } from './event';
import moment = require('moment');
const https = require('https');
var debug = require('debug')('kalendar-events_icloud')

function process(reslist: IKalenderEvent[], start: any, end: any, ics: any, kalEv: KalenderEvents) {
    const cal = new icalExpander({ ics, maxIterations: 1000 });
    const events = cal.between(start.toDate(), end.toDate());

    for (let event of kalEv.convertEvents(events)) {
        const key = event?.uid?.uid! + event?.uid?.date!;
        reslist[<any>key] = event;
    }
}

function requestIcloudSecure(config: Config, start: moment.Moment, end: moment.Moment): Promise<any> {
    return new Promise((resolve) => {
        const DavTimeFormat = 'YYYYMMDDTHHmms\\Z',
            url = config.url,
            user = config.username,
            pass = config.password,
            urlparts = /(https?)\:\/\/(.*?):?(\d*)?(\/.*\/?)/gi.exec(url!),
            protocol = urlparts![1],
            host = urlparts![2],
            port = urlparts![3] || (protocol === "https" ? 443 : 80),
            path = urlparts![4];

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
            //@ts-ignore
            options.headers["Authorization"] = "Basic " + userpass;
        }

        var req = https.request(options, function (res: { on: (arg0: string, arg1: (chunk: any) => void) => void; }) {
            var s = "";
            res.on('data', function (chunk: string) {
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

        req.on('error', function (e: { message: string; }) {
            console.error('problem with request: ' + e.message);
        });
    });
}

export async function ICloud(config: Config, kalEv: KalenderEvents) {

    let { pastview, preview } = kalEv.getPreviews(config)


    const json = await requestIcloudSecure(config, pastview, preview);
    debug(json);
    var reslist: IKalenderEvent[] = [];
    if (json && json.multistatus && json.multistatus.response) {
        if (json.multistatus.response.propstat) {
            process(reslist, pastview, preview, json.multistatus.response.propstat.prop['calendar-data']._cdata, kalEv);
        } else {
            json.multistatus.response.forEach((response: any) => process(reslist, pastview, preview, response.propstat.prop['calendar-data']._cdata, kalEv));
        }
    }
    return reslist;
}