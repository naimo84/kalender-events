import { Config } from './config';

import dav = require('dav');
import Scrapegoat = require("scrapegoat");
import moment = require('moment');
import IcalExpander = require('ical-expander');
import * as  ical from 'node-ical';
import { KalenderEvents, CalEvent } from './lib';

export function CalDav(config: Config) {
    const calName = config.calendar;
    const ke = new KalenderEvents(config);
    const now = moment();
    const whenMoment = moment(now.toDate());

    // @ts-ignore
    let start = whenMoment.clone().startOf('day').subtract(config.pastview, config.pastviewUnits);
    // @ts-ignore
    let end = whenMoment.clone().endOf('day').add(config.preview, config.previewUnits);

    if (config.pastviewUnits === 'days') {
        start = whenMoment.clone().startOf('day').subtract(config.pastview + 1, 'days');
    }
    if (config.previewUnits === 'days') {
        end = whenMoment.clone().endOf('day').add(config.preview, 'days');
    }
    const filters = [{
        type: 'comp-filter',
        attrs: { name: 'VCALENDAR' },
        children: [{
            type: 'comp-filter',
            attrs: { name: 'VEVENT' },
            children: [{
                type: 'time-range',
                attrs: {
                    start: start.format('YYYYMMDD[T]HHmmss[Z]'),
                    end: end.format('YYYYMMDD[T]HHmmss[Z]'),
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
    let url = new URL(calDavUri);
    return dav.createAccount({ server: calDavUri, xhr: xhr, loadCollections: true, loadObjects: true })
        .then((account) => {
            let promises = [];
            if (!account.calendars) {
                throw 'CalDAV -> no calendars found.';
            }

            for (let calendar of account.calendars) {

                if (!calName || !calName.length || (calName && calName.length && calName.toLowerCase() === calendar.displayName.toLowerCase())) {
                    //@ts-ignore
                    promises.push(dav.listCalendarObjects(calendar, { xhr: xhr, filters: filters })
                        .then((calendarEntries: any) => {
                            let retEntries: any = {};
                            for (let calendarEntry of calendarEntries) {
                                const ics = calendarEntry.calendarData;
                                if (ics) {
                                    const icalExpander = new IcalExpander({ ics, maxIterations: 100 });
                                    const events = icalExpander.between(start.toDate(), end.toDate());

                                    ke.convertEvents(events).forEach((event: CalEvent) => {
                                        if (event) {
                                            event.calendarName = calendar.displayName;
                                            retEntries[event.uid] = event;
                                        }
                                    });
                                }
                            }
                            return retEntries;
                        }),
                    );
                    //@ts-ignore
                    promises.push(dav.listCalendarObjects(calendar, { xhr: xhr, filters: filters })
                        .then((calendarEntries: any) => {
                            let retEntries: any = {};
                            for (let calendarEntry of calendarEntries) {
                                if (calendarEntry.calendar.objects) {
                                    for (let calendarObject of calendarEntry.calendar.objects) {
                                        if (calendarObject.data && calendarObject.data.href) {
                                            let ics = url.origin + calendarObject.data.href;
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

                                            return ical.fromURL(ics, header).then((data: any) => {
                                                for (var k in data) {
                                                    var ev = ke.convertEvent(data[k]);
                                                    if (ev) {
                                                        ev.calendarName = calendar.displayName;
                                                        retEntries[ev.uid] = ev;
                                                    }
                                                }
                                                return retEntries;
                                            });
                                        }
                                    }
                                }
                            }
                        }),
                    );
                }
            }
            return Promise.all(promises);
        }, function (err) {
            throw err;
        });
}

export async function Fallback(config: Config) {
    const ke = new KalenderEvents(config);
    let scrapegoat = new Scrapegoat({
        auth: {
            user: config.username,
            pass: config.password
        },
        uri: config.url,
        rejectUnauthorized: config.rejectUnauthorized
    });

    let data = await scrapegoat.getAllEvents();

    return ke.convertEvents(data);
}