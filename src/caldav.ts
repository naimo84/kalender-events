import { Config } from './interfaces/config';

import dav = require('@naimo84/dav');
import Scrapegoat = require("scrapegoat");
import IcalExpander = require('ical-expander');
import * as  ical from './ical';
import { KalenderEvents } from './lib';
import * as URL from "url";

import { IKalenderEvent } from './interfaces/event';
import { convertEvent, convertEvents } from './convert';
import { getPreviews } from './helper';
import { parseICS } from './ical';
var debug = require('debug')('kalender-events:caldav');

export async function CalDav(config: Config): Promise<IKalenderEvent[]> {
    const calName = config.calendar;
    const ke = new KalenderEvents(config);
    let { preview, pastview } = getPreviews(config)

    const filters = [{
        type: 'comp-filter',
        attrs: { name: 'VCALENDAR' },
        children: [{
            type: 'comp-filter',
            attrs: { name: 'VEVENT' },
            children: [{
                type: 'time-range',
                attrs: {
                    start: pastview.format('YYYYMMDD[T]HHmmss[Z]'),
                    end: preview.format('YYYYMMDD[T]HHmmss[Z]'),
                },
            }],
        }],
    }];

    const xhr = new dav.transport.Basic(
        new dav.Credentials({
            username: config.username,
            password: config.password,
        }),
    );

    let calDavUri = config.url;
    let url = URL.parse(calDavUri as string);
    let host = url.protocol + '//' + url.host + '/';

    const account = await dav.createAccount({ server: calDavUri, xhr: xhr, loadCollections: true, loadObjects: true })

    if (!account.calendars) {
        throw 'CalDAV -> no calendars found.';
    }
    let retEntries: IKalenderEvent[] = [];
    for (let calendar of account.calendars) {
        if (!calName || !calName.length || (calName && calName.length && calName.toLowerCase() === calendar.displayName.toLowerCase())) {
            if (config.includeTodo) {
                let todoEntries = await dav.syncCalendar(calendar, {
                    xhr: xhr, filters: [
                        {
                            type: 'comp-filter',
                            attrs: { name: 'VTODO' },
                        }
                    ]
                })

                for (let todoEntry of todoEntries.objects) {
                    const ics = todoEntry.calendarData;
                    if (ics) {
                        const data = await parseICS(ics);
                        for (var k in data) {
                            //debug(`caldav - href: ${JSON.stringify(data[k])}`)
                            //@ts-ignore
                            if (data[k].type !== 'VTODO')
                                continue;
                           
                            var ev = convertEvent(data[k],config);
                            if (ev) {
                                ev.calendarName = calendar.displayName;
                                const key = `${ev.uid!.uid! + ev.uid!.date!}`;
                                retEntries[<any>key] = ev;
                            }
                        }
                    }
                }
            }

            //@ts-ignore
            let calendarEntries = await dav.listCalendarObjects(calendar, { xhr: xhr, filters: filters })
            for (let calendarEntry of calendarEntries) {
                const ics = calendarEntry.calendarData;
                /* istanbul ignore else */
                if (ics) {
                    const icalExpander = new IcalExpander({ ics, maxIterations: 100 });
                    const events = icalExpander.between(pastview.toDate(), preview.toDate());

                    convertEvents(events,config).forEach((event: IKalenderEvent) => {
                        debug(`caldav - ical: ${JSON.stringify(event)}`)
                        if (event) {
                            event.calendarName = calendar.displayName;
                            const key = `${event.uid!.uid! + event.uid!.date!}`;
                            retEntries[<any>key] = event;
                        }
                    });
                } else if (calendarEntry.calendar.objects) {
                    for (let calendarObject of calendarEntry.calendar.objects) {
                        if (calendarObject.data && calendarObject.data.href) {
                            let ics = host + calendarObject.data.href;
                            let header = {};
                            let username = config.username;
                            let password = config.password;
                            if (username && password) {
                                var auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
                                header = {
                                    headers: {
                                        'Authorization': auth,
                                    },
                                };
                            }

                            const data = await ical.fromURL(ics, header);
                            for (var k in data) {
                                //debug(`caldav - href: ${JSON.stringify(data[k])}`)
                                //@ts-ignore
                                var ev = ke.convertEvent(data[k]);
                                if (ev) {
                                    ev.calendarName = calendar.displayName;
                                    const key = `${ev.uid!.uid! + ev.uid!.date!}`;
                                    retEntries[<any>key] = ev;
                                }
                            }

                        }
                    }
                }



            }
        }
    }
    return retEntries;

}

export async function Fallback(config: Config) {
    debug(`Fallback`)
    let scrapegoat = new Scrapegoat({
        auth: {
            user: config.username,
            pass: config.password
        },
        uri: encodeURI(config.url as string).replace('@', '%40'),
        rejectUnauthorized: config.rejectUnauthorized,
        headers: {
            "Content-Type": "application/xml"
        }
    });

    let data = await scrapegoat.getAllEvents();
    debug(`Fallback - data: ${JSON.stringify(data)}`)

    return convertEvents(data,config);
}