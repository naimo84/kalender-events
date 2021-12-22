import xmlParser = require('xml-js');
import icalExpander = require('ical-expander');
import { Config } from './interfaces/config';
import { IKalenderEvent } from './interfaces/event';
import moment = require('moment');
import { convertEvents } from './convert';
import { getPreviews } from './helper';
const https = require('https');
var debug = require('debug')('kalender-events:icloud')

function process(reslist: IKalenderEvent[], start: any, end: any, ics: any, config: Config) {
    const cal = new icalExpander({ ics, maxIterations: 1000 });
    const events = cal.between(start.toDate(), end.toDate());
    debug(`process - events: ${JSON.stringify(events)}`)

    for (let event of convertEvents(events, config)) {
        const key = event?.uid?.uid! + event?.uid?.date!;
        reslist[<any>key] = event;
    }
}

function requestIcloudSecure(config: Config, start: moment.Moment, end: moment.Moment): Promise<any> {
    return new Promise((resolve, reject) => {
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
        debug(`requestIcloudSecure - options: ${JSON.stringify(options)}`)
        debug(`requestIcloudSecure - xml: ${xml}`)
        var req = https.request(options, function (res: { on: (arg0: string, arg1: (chunk: any) => void) => void; }) {
            var s = "";
            res.on('data', function (chunk: string) {
                s += chunk;
            });

            req.on('close', function () {
                try {
                    const json = JSON.parse(xmlParser.xml2json(s, { compact: true, spaces: 0 }));
                    if (Object.keys(json).length === 0) {
                        throw new Error("No data")
                    }
                    resolve(json);
                } catch (e) {
                    reject(e);
                }
            });
        });

        req.end(xml);

        req.on('error', function (e: { message: string; }) {
            /* istanbul ignore next */
            throw e;
        });
    });
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