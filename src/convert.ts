import moment from "moment";
import { v4 } from "uuid";
import { formatDate } from "./format";
import { isAllDay } from "./helper";
import { Config, iCalEvent, IKalenderEvent } from "./interfaces";
var debug = require('debug')('kalender-events:convert')

export function convertEvents(events: any, config: Config): IKalenderEvent[] {
    let retEntries: IKalenderEvent[] = [];
    if (events) {
        debug(`convertEvents - events: ${JSON.stringify(events)}`)
        if (Array.isArray(events)) {
            events.forEach(event => {
                let ev = convertScrapegoat(event.data, config);
                if (ev)
                    retEntries.push(ev);
            });
        } else if (events.events || events.occurrences) {
            if (events.events) {
                events.events.forEach((event: any) => {
                    let ev = convertEvent(event, config);
                    if (ev)
                        retEntries.push(ev);
                });
            }
            if (events.occurrences && events.occurrences.length > 0) {
                events.occurrences.forEach((event: any) => {
                    let ev = convertEvent(event, config);
                    if (ev)
                        retEntries.push(ev);
                });
            }
        } else {
            for (let index in events) {
                let ev = convertEvent(events[index], config);
                if (ev)
                    retEntries.push(ev);
            }

        }
    }

    return retEntries;
}

function getDateVal(date: any) {
    return (date && date.val) ? date.val : date;
}

function getStartEndDate(event: iCalEvent) {
    let startDate = new Date((!event.type || event.type === "VEVENT")
        ? (event.startDate?.toJSDate() || moment(getDateVal(event.start)).toDate())
        : moment(getDateVal(event.start) || getDateVal(event.due)).toISOString());

    let endDate = new Date(
        event.endDate?.toJSDate()
        || ((!event.type || event.type === "VEVENT")
            ? getDateVal(event.end)
            : moment(getDateVal(event.due) || getDateVal(event.end)).toISOString())
        || moment(getDateVal(event.start)).toDate()
    );

    return { startDate, endDate }
}

export function convertEvent(event: iCalEvent, config: Config): IKalenderEvent | undefined {
    if (event && !Array.isArray(event)) {
        if (event.item) {
            event = event.item
        }

        if ((config.type === "ical" && event.type === undefined) || (event.type && (!["VEVENT", "VTODO", "VALARM"].includes(event.type)))) {
            return undefined;
        }

        let { startDate, endDate } = getStartEndDate(event)

        debug(`convertEvent - event: ${JSON.stringify(event)}`)
        const recurrence = event.recurrenceId;

        /* istanbul ignore if */
        if (event.type === "VTODO" && !config.includeTodo) {
            return undefined;
        }

        if (event.duration?.wrappedJSObject) {
            delete event.duration.wrappedJSObject
        }

        let uid = {
            uid: event.uid || v4(),
            date: ''
        };
        if (recurrence) {
            uid.date = new Date(recurrence.year, recurrence.month, recurrence.day, recurrence.hour, recurrence.minute, recurrence.second).getTime().toString();
        } else {
            uid.date = startDate.getTime().toString()
        }

        if (!event.duration) {
            event.duration = moment.duration(endDate.getTime() - startDate.getTime());
        }

        let returnEvent: IKalenderEvent = {
            date: formatDate(event, startDate, endDate, true, config),
            eventStart: startDate,
            eventEnd: endDate,
            summary: event.summary || '',
            description: event.description || '',
            attendee: event.attendees || event.attendee,
            duration: (typeof event.duration?.toICALString === 'function') ? event.duration?.toICALString() : event.duration.toString(),
            durationSeconds: (typeof event.duration?.toSeconds === 'function') ? event.duration?.toSeconds() : (moment.duration(event.duration).asSeconds()),
            location: event.location || '',
            organizer: event.organizer || '',
            rrule: event.rrule,
            rruleText: event.rrule?.toText(),
            uid: uid,
            isRecurring: !!recurrence || !!event.rrule,
            datetype: event.type === "VTODO" ? 'todo' : 'date',
            allDay: isAllDay(event, startDate, endDate),
            calendarName: null as any,
            exdate: event.exdate,
            recurrences: event.recurrences,
            categories: event.categories,
            alarms: [],
            status: event.type === "VTODO" ? {
                completed: event.status === "COMPLETED",
                percent: event.completion,
                date: moment(getDateVal(event.completed)).toDate(),
            } : undefined,
            originalEvent: event
        }

        const makeProperty = (k: string, v: string | Date | undefined) => {
            const tmpObj: any = {};
            tmpObj[k] = v;
            return (v !== undefined && v !== "") ? tmpObj : {}
        }
        for (let key of Object.keys(event)) {
            const alarm = event[key as keyof iCalEvent];
            if (alarm?.type === "VALARM") {
                returnEvent.alarms.push(Object.assign({},
                    makeProperty("trigger", (typeof alarm.trigger?.toICALString === 'function') ? alarm.trigger?.toICALString() : alarm.trigger),
                    makeProperty("triggerParsed", moment(startDate).add(moment.duration(alarm.trigger)).toDate()),
                    makeProperty("action", alarm.action),
                    makeProperty("summary", alarm.summary),
                    makeProperty("description", alarm.description),
                    makeProperty("attendee", alarm.attendees || alarm.attendee)
                ))
            }
        }

        Object.keys(returnEvent).forEach(key => {
            if (returnEvent[key as keyof IKalenderEvent] === undefined
                || returnEvent[key as keyof IKalenderEvent] === ""
                || (Array.isArray(returnEvent[key as keyof IKalenderEvent]) && Object.keys(returnEvent[key as keyof IKalenderEvent]).length === 0 && returnEvent[key as keyof IKalenderEvent].length === 0)) {
                delete returnEvent[key as keyof IKalenderEvent];
            }
        });

        return returnEvent
    }
    return undefined;
}

/* istanbul ignore next */
export function convertScrapegoat(event: any, config: Config): IKalenderEvent | undefined {
    if (event) {
        let startDate = moment(event.start).toDate();
        let endDate = moment(event.end).toDate();
        debug(`convertScrapegoat - event: ${JSON.stringify(event)}`)

        const recurrence = event.recurrenceId || event.type?.recurring;

        if (event.duration?.wrappedJSObject) {
            delete event.duration.wrappedJSObject
        }

        let uid = event.uid || v4();
        uid += startDate.getTime().toString();

        let duration = event.duration;
        let allday = false;
        if (!duration) {
            var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
            seconds = Number(seconds);
            allday = ((seconds % 86400) === 0)
        } else {
            if (/(-)?P(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?(?:T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?)?/.test(duration)) {
                allday = ((moment.duration(duration).asSeconds() % 86400) === 0)
            }
            else {
                allday = ((duration.toSeconds() % 86400) === 0)
            }
        }
        let date = formatDate(event, startDate, endDate, true, config);

        return {
            date: date.trim(),
            eventStart: startDate,
            eventEnd: endDate,
            summary: event.summary || event.title || '',
            description: event.description || '',
            attendee: event.attendees,
            duration: (typeof event.duration?.toICALString === 'function') ? event.duration?.toICALString() : event.duration,
            durationSeconds: (typeof event.duration?.toSeconds === 'function') ? event.duration?.toSeconds() : (moment.duration(duration).asSeconds()),
            location: event.location || '',
            organizer: event.organizer || '',
            uid: uid,
            isRecurring: !!recurrence,
            datetype: 'date',
            allDay: allday,
            calendarName: null as any,
            alarms: []
        }
    }
    return undefined;
}
