import xmlParser = require('xml-js');
import icalExpander = require('ical-expander');
import { Config } from './config';
import axios, { AxiosRequestConfig } from "axios";
import {KalenderEvents} from './lib';
import moment = require('moment');

function process(reslist:any, start:any, end:any, ics:any, kalEv:KalenderEvents) {
    const cal = new icalExpander({ ics, maxIterations: 1000 });
    const events = cal.between(start.toDate(), end.toDate());

    for (let event of kalEv.convertEvents(events)) {
        reslist[event.uid + event.start] = event;
    }
}

async function requestIcloudSecure(config: Config, start:any, end:any) {
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



    let conf: AxiosRequestConfig = {
        // @ts-ignore
        method: 'REPORT',        
        baseURL: `${protocol}://${host}`,
        url: path,
        headers: {
            "Content-type": "application/xml",
            "Content-Length": xml.length,
            "User-Agent": "calDavClient",
            "Connection": "close",
            "Depth": "1"
        },
        data: xml
    }

    if (user && pass) {
        conf.auth = {
            username: user,
            password: pass
        }
    }

    try {
        let data = await axios(conf);
        const json = JSON.parse(xmlParser.xml2json(data.data, { compact: true, spaces: 0 }));
        return json;
    } catch (err) {
        console.error(err);
    }
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

    var reslist = {};
    if (json && json.multistatus && json.multistatus.response) {
        if (json.multistatus.response.propstat) {
            process(reslist, start, end, json.multistatus.response.propstat.prop['calendar-data']._cdata,kalEv);
        } else {
            json.multistatus.response.forEach((response:any) => process(reslist, start, end, response.propstat.prop['calendar-data']._cdata,kalEv));
        }
    }
    return reslist;
}