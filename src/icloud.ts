import xmlParser = require('xml-js');
import icalExpander = require('ical-expander');
import { Config } from './interfaces/config';
import { IKalenderEvent } from './interfaces/event';
import moment = require('moment');
import { convertEvents } from './convert';
import { getPreviews } from './helper';
import axios, { AxiosRequestConfig } from 'axios';
var debug = require('debug')('kalender-events:icloud')
import { PassThrough } from "stream";

function process(reslist: IKalenderEvent[], start: any, end: any, ics: any, config: Config) {
    const cal = new icalExpander({ ics, maxIterations: 1000 });
    const events = cal.between(start.toDate(), end.toDate());
    debug(`process - events: ${JSON.stringify(events)}`)

    for (let event of convertEvents(events, config)) {
        const key = event?.uid?.uid! + event?.uid?.date!;
        reslist[<any>key] = event;
    }
}

async function requestIcloudSecure(config: Config, start: moment.Moment, end: moment.Moment): Promise<any> {
    const DavTimeFormat = 'YYYYMMDDTHHmms\\Z';

    var xml = `<?xml version="1.0" encoding="utf-8" ?>\n
        <C:calendar-query xmlns:D="DAV:" xmlns:C="urn:ietf:params:xml:ns:caldav">\n
          <D:prop>\n
            <C:calendar-data/>\n
          </D:prop>\n
          <C:filter>\n
            <C:comp-filter name="VCALENDAR">\n
              <C:comp-filter name="VEVENT">\n
                <C:time-range start="${start.format(DavTimeFormat)}" end="${end.format(DavTimeFormat)}" />\n
              </C:comp-filter>\n
            </C:comp-filter>\n
          </C:filter>\n
        </C:calendar-query>`;

    var options: AxiosRequestConfig = {
        rejectUnauthorized: config.rejectUnauthorized,
        url: config.url,
        //@ts-ignore
        method: 'REPORT',
        headers: {
            "Content-type": "application/xml",
            "Content-Length": xml.length,
            "User-Agent": "calDavClient",
            "Connection": "close",
            "Depth": "1"
        }
    };

    if (config.username && config.password) {
        options.auth = { username: config.username as string, password: config.password as string }
    }
    debug(`requestIcloudSecure - options: ${JSON.stringify(options)}`)
    debug(`requestIcloudSecure - xml: ${xml}`)

    const res = await axios({
        ...options,
        data: xml,
        responseType: 'stream',
    });

    const chunks = res?.data?.pipe(new PassThrough({ encoding: 'utf-8' }));
    let str = '';
    for await (let chunk of chunks) {
        str += chunk;
    }
    const json = JSON.parse(xmlParser.xml2json(str, { compact: true, spaces: 0 }));
    if (Object.keys(json).length === 0) {
        throw new Error("No data")
    }

    return json;
}

export async function ICloud(config: Config) {
    let { pastview, preview } = getPreviews(config)

    const json = await requestIcloudSecure(config, pastview, preview);
    debug(`ICloud - json: ${JSON.stringify(json)}`);
    var reslist: IKalenderEvent[] = [];
    if (json && json.multistatus && json.multistatus.response) {
        /* istanbul ignore else */
        if (json.multistatus.response.propstat) {
            process(reslist, pastview, preview, json.multistatus.response.propstat.prop['calendar-data']._cdata, config);
        } else {
            json.multistatus.response.forEach((response: any) => process(reslist, pastview, preview, response.propstat.prop['calendar-data']._cdata, config));
        }
    }
    return reslist;
}