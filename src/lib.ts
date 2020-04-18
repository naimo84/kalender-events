import moment = require('moment');
import { ICloud } from './icloud';
import { CalDav, Fallback } from './caldav';
import { Config } from './config';
import nodeIcal = require('node-ical');
import * as NodeCache from 'node-cache';
var debug = require('debug')('kalendar-events')
var RRule = require('rrule').RRule;
var ce = require('cloneextend');
export interface Job {
    id: string,
    cronjob: any
}
export interface IKalenderEvent {
    summary?: string,
    topic?: string,
    location?: string,
    eventStart?: Date
    eventEnd?: Date,
    date?: string,
    event?: string,
    description?: string,
    id?: string,
    allDay?: boolean,
    rule?: string,
    on?: boolean,
    off?: boolean,
    countdown?: object,
    calendarName?: string,
    uid?: string,
}

export interface iCalEvent {
    summary?: any,
    topic?: string,
    location?: string,
    start?: Date
    end?: Date,
    datetype?: string,
    event?: string,
    description?: string,
    id?: string,
    allDay?: boolean,
    rule?: string,
    on?: boolean,
    off?: boolean,
    countdown?: object,
    calendarName?: string,
    uid?: string,
}

export class KalenderEvents {
    private cache: NodeCache;
    private config: Config;

    constructor(config?: Config) {
        this.config = config;
        this.cache = new NodeCache();
    }

    /**    
    * @param date Date, eg. new Date()
    * @param args offset either in minutes or as value and type (seconds, minutes, hours, days)
    * ```
    * example:
    * let ke = new KalenderEvents();
    * ke.addOffset(new Date(), 10, 'hours') // adds 10 hours
    * ke.addOffset(new Date(), 10) // adds 10 minutes
    * ```
    */
    public addOffset(date: Date, ...args: any): Date {
        if (args.length == 1) {
            let dat = new Date(date.getTime() + parseInt(args) * 60 * 1000);
            return dat;
        } else {
            let dat = moment(date).add(args[0], args[1]).toDate();
            return dat;
        }
    }

    /**  
    * calculates the countdown to ``date``
    * @param date Date, eg. new Date()    
    * ```
    * example:
    * let ke = new KalenderEvents();
    * let countdown = ke.countdown(ke.addOffset(new Date(), 10))
    * 
    * console.log(countdown)
    * --> 
    * {
    *  days: 0,
    *  hours: 0,
    *  minutes: 10,
    *  seconds: 0,
    * }
    * 
    * ```
    */
    public countdown(date: Date) {

        var seconds = (date.getTime() - new Date().getTime()) / 1000;
        seconds = Number(seconds);

        var d = Math.floor(seconds / (3600 * 24));
        var h = Math.floor(seconds % (3600 * 24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);

        return {
            days: d,
            hours: h,
            minutes: m,
            seconds: s,
        };
    }

    public async getEvents(config?: Config) {
        try {
            if (config) {
                this.config = Object.assign(this.config, config);
            }
            let data = await this.getCal();

            var realnow = new Date();
            var preview = new Date();
            var pastview = new Date();

            if (this.config.previewUnits === 'days') {
                if (this.config.preview == 1) {
                    preview = moment(preview).endOf('day').add(this.config.preview - 1, 'days').toDate();
                } else {
                    preview = moment(preview).endOf('day').add(this.config.preview, 'days').toDate();
                }
            } else {
                //@ts-ignore
                preview = moment(preview)
                    .add(this.config.preview, this.config.previewUnits.charAt(0))
                    .toDate();
            }

            if (this.config.pastviewUnits === 'days') {
                if (this.config.pastview == 1) {
                    pastview = moment(pastview).startOf('day').subtract(this.config.pastview - 1, 'days').toDate();
                } else {
                    pastview = moment(pastview).startOf('day').subtract(this.config.pastview, 'days').toDate();
                }
            } else {
                //@ts-ignore
                pastview = moment(pastview)
                    .subtract(this.config.pastview, this.config.pastviewUnits.charAt(0))
                    .toDate();
            }
            let processedData = this.processData(data, realnow, pastview, preview);
            if (this.cache) {
                if (data) {
                    this.cache.set("events", processedData);
                }
            }
            return processedData;
        } catch (err) {
            if (this.cache) {
                return this.cache.get("events") as IKalenderEvent[];
            }
        }
    }

    public convertEvents(events: any): any[] {
        let retEntries: any = [];
        if (events) {
            if (Array.isArray(events)) {
                events.forEach(event => {
                    let ev = this.convertScrapegoat(event.data);
                    retEntries.push(ev);
                });
            }
            else {
                if (events.events) {
                    events.events.forEach((event: any) => {
                        let ev = this.convertEvent(event);
                        retEntries.push(ev);
                    });
                }
                if (events.occurrences && events.occurrences.length > 0) {
                    events.occurrences.forEach((event: any) => {
                        let ev = this.convertEvent(event);
                        retEntries.push(ev);
                    });
                }
            }
        }

        return retEntries;
    }

    public convertEvent(e: any): any {
        if (e) {
            let startDate = e.startDate?.toJSDate() || e.start;
            let endDate = e.endDate?.toJSDate() || e.end;

            const recurrence = e.recurrenceId;

            if (e.item) {
                e = e.item
            }
            if (e.type && e.type !== "VEVENT") {
                return;
            }
            if (e.duration?.wrappedJSObject) {
                delete e.duration.wrappedJSObject
            }

            let uid = e.uid || this.uuidv4();
            if (recurrence) {
                uid += new Date(recurrence.year, recurrence.month, recurrence.day, recurrence.hour, recurrence.minute, recurrence.second).getTime().toString();
            } else {
                uid += startDate.getTime().toString();
            }

            let duration = e.duration;
            let allday = false;
            if (!duration) {
                var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
                seconds = Number(seconds);
                allday = ((seconds % 86400) === 0)
            } else {
                allday = ((duration.toSeconds() % 86400) === 0)
            }

            return {
                start: startDate,
                end: endDate,
                summary: e.summary || '',
                description: e.description || '',
                attendees: e.attendees,
                duration: e.duration?.toICALString(),
                durationSeconds: e.duration?.toSeconds(),
                location: e.location || '',
                organizer: e.organizer || '',
                uid: uid,
                isRecurring: !!recurrence,
                datetype: 'date',
                type: 'VEVENT',
                allDay: allday,
                calendarName: null as any
            }
        }
    }

    private uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    private convertScrapegoat(e: any) {
        if (e) {
            let startDate = moment(e.start).toDate();
            let endDate = moment(e.end).toDate();

            const recurrence = e.recurrenceId;

            if (e.duration?.wrappedJSObject) {
                delete e.duration.wrappedJSObject
            }

            let uid = e.uid || this.uuidv4();
            uid += startDate.getTime().toString();

            let duration = e.duration;
            let allday = false;
            if (!duration) {
                var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
                seconds = Number(seconds);
                allday = ((seconds % 86400) === 0)
            } else {
                allday = ((duration.toSeconds() % 86400) === 0)
            }

            return {
                start: startDate,
                end: endDate,
                summary: e.title || '',
                description: e.title || '',
                attendees: e.attendees,
                duration: e.duration?.toICALString(),
                durationSeconds: e.duration?.toSeconds(),
                location: e.location || '',
                organizer: e.organizer || '',
                uid: uid,
                isRecurring: false,
                datetype: 'date',
                type: 'VEVENT',
                allDay: allday,
                calendarName: null as any
            }
        }
    }

    private getTimezoneOffset(date: Date) {
        var offset = 0;
        var zone = moment.tz.zone(moment.tz.guess());
        if (zone && date) {
            offset = zone.utcOffset(date.getTime());
        }
        return offset;
    }

    private async getCal(): Promise<iCalEvent> {
        if (this.config.caldav && this.config.caldav === 'icloud') {
            debug('icloud');
            const now = moment();
            const when = now.toDate();
            let list = await ICloud(moment(when), this.config, this);
            return list;
        } else if (this.config.caldav && JSON.parse(this.config.caldav) === true) {
            debug('caldav');
            try {
                let data = await CalDav(this.config);
                let retEntries: iCalEvent = {};
                if (data) {
                    for (let events of data) {
                        for (let event in events) {
                            var ev = await events[event];
                            retEntries[ev.uid] = ev;
                        }
                    }
                }
                return retEntries;
            }
            catch (err) {
                debug(`caldav - get calendar went wrong. Error Message: ${err}`)
                debug(`caldav - using fallback`)
                Fallback(this.config).then((data) => {
                    return data;
                }).catch(err_fallback => {
                    throw (`caldav - get calendar went wrong. Error Message: ${err_fallback}`)
                })
            };
        } else {
            debug('ical');
            if (this.config?.url?.match(/^https?:\/\//)) {
                let header = {};
                let username = this.config.username;
                let password = this.config.password;

                if (username && password) {
                    var auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
                    header = {
                        headers: {
                            'Authorization': auth,
                        },
                    };
                }

                let data = await nodeIcal.async.fromURL(this.config.url, header);
                return data;
            } else {
                if (!this.config.url) {
                    throw "URL/File is not defined";
                }
                return await nodeIcal.async.parseFile(this.config.url);
            }
        }
    }

    private processRRule(ev: any, preview: Date, today: Date) {
        var eventLength = ev.end.getTime() - ev.start.getTime();
        var options = RRule.parseString(ev.rrule.toString());
        options.dtstart = this.addOffset(ev.start, -this.getTimezoneOffset(ev.start));
        if (options.until) {
            options.until = this.addOffset(options.until, -this.getTimezoneOffset(options.until));
        }
        debug('options:' + JSON.stringify(options));

        var rule = new RRule(options);
        var now2 = new Date();
        now2.setHours(0, 0, 0, 0);
        var now3 = new Date(now2.getTime() - eventLength);
        if (now2 < now3) now3 = now2;
        debug(
            'RRule event:' +
            ev.summary +
            '; start:' +
            ev.start.toString() +
            '; preview:' +
            preview.toString() +
            '; today:' +
            today +
            '; now2:' +
            now2 +
            '; now3:' +
            now3 +
            '; rule:' +
            JSON.stringify(rule)
        );

        var dates = [];
        try {
            dates = rule.between(now3, preview, true);
        } catch (e) {
            throw (
                'Issue detected in RRule, event ignored; ' +
                e.stack +
                '\n' +
                'RRule object: ' +
                JSON.stringify(rule) +
                '\n' +
                'now3: ' +
                now3 +
                '\n' +
                'preview: ' +
                preview +
                '\n' +
                'string: ' +
                ev.rrule.toString() +
                '\n' +
                'options: ' +
                JSON.stringify(options)
            );
        }

        debug('dates:' + JSON.stringify(dates));
        let reslist = [];
        if (dates.length > 0) {
            for (var i = 0; i < dates.length; i++) {
                var ev2 = ce.clone(ev);
                var start = dates[i];
                ev2.start = this.addOffset(start, this.getTimezoneOffset(start));

                var end = new Date(start.getTime() + eventLength);
                ev2.end = this.addOffset(end, this.getTimezoneOffset(end));

                debug('   ' + i + ': Event (' + JSON.stringify(ev2.exdate) + '):' + ev2.start.toString() + ' ' + ev2.end.toString());

                var checkDate = true;
                if (ev2.exdate) {
                    for (var d in ev2.exdate) {
                        if (ev2.exdate[d].getTime() === ev2.start.getTime()) {
                            checkDate = false;
                            debug('   ' + i + ': sort out');
                            break;
                        }
                    }
                }
                if (checkDate && ev.recurrences) {
                    for (var dOri in ev.recurrences) {
                        let recurrenceid = ev.recurrences[dOri].recurrenceid
                        if (recurrenceid) {
                            if (recurrenceid.getTime() === ev2.start.getTime()) {
                                ev2 = ce.clone(ev.recurrences[dOri]);
                                debug('   ' + i + ': different recurring found replaced with Event:' + ev2.start + ' ' + ev2.end);
                            }
                        }
                    }
                }


                if (checkDate) {
                    reslist.push(ev2);
                }
            }
        }
        return reslist;
    }

    private processData(data: any, realnow: Date, pastview: Date, preview: Date): IKalenderEvent[] {
        let reslist: IKalenderEvent[] = [];
        this.processDataRev(data, realnow, pastview, preview, reslist);
        return reslist;
    }

    private processDataRev(data: any, realnow: Date, pastview: Date, preview: Date, reslist: IKalenderEvent[]) {
        var processedEntries = 0;

        for (var k in data) {
            var ev = data[k];
            delete data[k];

            if (ev.type === 'VEVENT') {
                if (!ev.end) {
                    ev.end = ce.clone(ev.start);
                    if (!ev.start.getHours() && !ev.start.getMinutes() && !ev.start.getSeconds()) {
                        ev.end.setDate(ev.end.getDate() + 1);
                    }
                }

                if (ev.rrule === undefined) {
                    this.checkDates(ev, preview, pastview, realnow, ' ', reslist);
                } else {
                    let evlist = this.processRRule(ev, preview, pastview);
                    for (let ev2 of evlist) {
                        this.checkDates(ev2, preview, pastview, realnow, ' rrule ', reslist);
                    }

                }
            }

            if (++processedEntries > 100) {
                break;
            }
        }
        if (!Object.keys(data).length) {
            return;
        } else {
            this.processDataRev(data, realnow, pastview, preview, reslist);
        }
    }

    private checkDates(ev: iCalEvent, preview: Date, pastview: Date, realnow: Date, rule: string, reslist: IKalenderEvent[]) {
        var fullday = false;
        var reason: string;
        var date: any;

        if (ev.summary && ev.summary.hasOwnProperty('val')) {
            reason = ev.summary.val;
        } else {
            reason = ev.summary;
        }
        var location = ev.location || '';

        if (!ev.start) return;
        if (!ev.end) ev.end = ev.start;
        ev.start = new Date(ev.start);
        ev.end = new Date(ev.end);
        if (
            !ev.start.getHours() &&
            !ev.start.getMinutes() &&
            !ev.start.getSeconds() &&
            !ev.end.getHours() &&
            !ev.end.getMinutes() &&
            !ev.end.getSeconds()
        ) {
            if (ev.end.getTime() == ev.start.getTime() && ev.datetype == 'date') {
                ev.end.setDate(ev.end.getDate() + 1);
            }
            if (ev.end.getTime() !== ev.start.getTime()) {
                fullday = true;
            }
        }

        let output = false;
        if (this.config.trigger == 'match') {
            let regex = new RegExp(this.config.filter);
            if (regex.test(ev.summary)) output = true;
        } else if (this.config.trigger == 'nomatch') {
            let regex = new RegExp(this.config.filter);
            if (!regex.test(ev.summary)) output = true;
        } else {
            output = true;
        }
        if (output) {
            debug('Event: ' + JSON.stringify(ev))

            if (fullday) {
                if (
                    (ev.start < preview && ev.start >= pastview) ||
                    (ev.end > pastview && ev.end <= preview) ||
                    (ev.start < pastview && ev.end > pastview)
                ) {
                    date = this.formatDate(ev.start, ev.end, true, true);

                    this.insertSorted(reslist, {
                        date: date.text.trim(),
                        summary: ev.summary,
                        topic: ev.summary,
                        calendarName: ev.calendarName,
                        event: reason,
                        eventStart: new Date(ev.start.getTime()),
                        eventEnd: new Date(ev.end.getTime()),
                        description: ev.description,
                        id: ev.uid,
                        allDay: true,
                        rule: rule,
                        location: location,
                        countdown: this.countdown(new Date(ev.start))
                    });

                    debug('Event (full day) added : ' + JSON.stringify(rule) + ' ' + reason + ' at ' + date.text);
                }
            } else {
                // Event with time              
                if (
                    (ev.start >= pastview && ev.start < preview) ||
                    (ev.end >= realnow && ev.end <= preview) ||
                    (ev.start < realnow && ev.end > realnow)
                ) {
                    date = this.formatDate(ev.start, ev.end, true, false);
                    this.insertSorted(reslist, {
                        date: date.text.trim(),
                        event: reason,
                        summary: ev.summary,
                        topic: ev.summary,
                        calendarName: ev.calendarName,
                        eventStart: new Date(ev.start.getTime()),
                        eventEnd: new Date(ev.end.getTime()),
                        description: ev.description,
                        id: ev.uid,
                        allDay: false,
                        rule: rule,
                        location: location,
                        countdown: this.countdown(new Date(ev.start))
                    });
                    debug('Event with time added: ' + JSON.stringify(rule) + ' ' + reason + ' at ' + date.text);
                }
            }
        }
    }

    private insertSorted(arr: IKalenderEvent[], element: IKalenderEvent) {
        if (!arr.length) {
            arr.push(element);
        } else {
            if (arr[0].eventStart > element.eventStart) {
                arr.unshift(element);
            } else if (arr[arr.length - 1].eventStart < element.eventStart) {
                arr.push(element);
            } else {
                if (arr.length === 1) {
                    arr.push(element);
                } else {
                    for (var i = 0; i < arr.length - 1; i++) {
                        if (arr[i].eventStart <= element.eventStart && element.eventStart < arr[i + 1].eventStart) {
                            arr.splice(i + 1, 0, element);
                            element = null;
                            break;
                        }
                    }
                    if (element) arr.push(element);
                }
            }
        }
    }

    private formatDate(_date: Date, _end: Date, withTime: boolean, fullday: boolean) {
        var day: any = _date.getDate();
        var month: any = _date.getMonth() + 1;
        var year = _date.getFullYear();
        var endday = _end.getDate();
        var endmonth = _end.getMonth() + 1;
        var endyear = _end.getFullYear();
        var _time = '';
        var alreadyStarted = _date < new Date();

        if (withTime) {
            var hours = _date.getHours().toString();
            var minutes = _date.getMinutes().toString();

            if (!alreadyStarted) {
                if (parseInt(hours) < 10) hours = '0' + hours.toString();
                if (parseInt(minutes) < 10) minutes = '0' + minutes.toString();
                _time = ' ' + hours + ':' + minutes;
            }
            var timeDiff = _end.getTime() - _date.getTime();
            if (timeDiff === 0 && parseInt(hours) === 0 && parseInt(minutes) === 0) {
                _time = ' ';
            } else if (timeDiff > 0) {
                if (!alreadyStarted) {
                    _time += '-';
                } else {
                    _time += ' ';
                }

                var endhours = _end.getHours().toString();
                var endminutes = _end.getMinutes().toString();

                if (parseInt(endhours) < 10) endhours = '0' + endhours.toString();

                if (parseInt(endminutes) < 10) endminutes = '0' + endminutes.toString();
                _time += endhours + ':' + endminutes;

                var startDayEnd = new Date();
                startDayEnd.setFullYear(_date.getFullYear());
                startDayEnd.setMonth(_date.getMonth());
                startDayEnd.setDate(_date.getDate() + 1);
                startDayEnd.setHours(0, 0, 0, 0);

                if (_end > startDayEnd) {
                    var start = new Date();
                    if (!alreadyStarted) {
                        start.setDate(_date.getDate());
                        start.setMonth(_date.getMonth());
                        start.setFullYear(_date.getFullYear());
                    }
                    start.setHours(0, 0, 1, 0);
                    var fullTimeDiff = timeDiff;
                    timeDiff = _end.getTime() - start.getTime();

                    if (fullTimeDiff >= 24 * 60 * 60 * 1000) {
                        _time += '+' + Math.floor(timeDiff / (24 * 60 * 60 * 1000));
                    }
                } else if (this.config.replacedates && _end.getHours() === 0 && _end.getMinutes() === 0) {
                    _time = ' ';
                }
            }
        }
        var _class = '';
        var d = new Date();
        d.setHours(0, 0, 0, 0);
        var d2 = new Date();
        d2.setDate(d.getDate() + 1);

        var todayOnly = false;
        if (
            day === d.getDate() &&
            month === d.getMonth() + 1 &&
            year === d.getFullYear() &&
            endday === d2.getDate() &&
            endmonth === d2.getMonth() + 1 &&
            endyear === d2.getFullYear() &&
            fullday
        ) {
            todayOnly = true;
        }

        if (todayOnly || !alreadyStarted) {
            if (day === d.getDate() && month === d.getMonth() + 1 && year === d.getFullYear()) {
                _class = 'ical_today';
            }

            d.setDate(d.getDate() + 1);
            if (day === d.getDate() && month === d.getMonth() + 1 && year === d.getFullYear()) {
                _class = 'ical_tomorrow';
            }

            d.setDate(d.getDate() + 1);
            if (day === d.getDate() && month === d.getMonth() + 1 && year === d.getFullYear()) {
                _class = 'ical_dayafter';
            }

            d.setDate(d.getDate() + 1);
            if (day === d.getDate() && month === d.getMonth() + 1 && year === d.getFullYear()) {
                _class = 'ical_3days';
            }

            d.setDate(d.getDate() + 1);
            if (day === d.getDate() && month === d.getMonth() + 1 && year === d.getFullYear()) {
                _class = 'ical_4days';
            }

            d.setDate(d.getDate() + 1);
            if (day === d.getDate() && month === d.getMonth() + 1 && year === d.getFullYear()) {
                _class = 'ical_5days';
            }

            d.setDate(d.getDate() + 1);
            if (day === d.getDate() && month === d.getMonth() + 1 && year === d.getFullYear()) {
                _class = 'ical_6days';
            }

            d.setDate(d.getDate() + 1);
            if (day === d.getDate() && month === d.getMonth() + 1 && year === d.getFullYear()) {
                _class = 'ical_oneweek';
            }

            if (this.config.replacedates) {
                if (_class === 'ical_today')
                    return {
                        text: this.replaceText('today') + _time,
                        _class: _class,
                    };
                if (_class === 'ical_tomorrow') return { text: this.replaceText('tomorrow') + _time, _class: _class };
                if (_class === 'ical_dayafter') return { text: this.replaceText('dayafter') + _time, _class: _class };
                if (_class === 'ical_3days') return { text: this.replaceText('3days') + _time, _class: _class };
                if (_class === 'ical_4days') return { text: this.replaceText('4days') + _time, _class: _class };
                if (_class === 'ical_5days') return { text: this.replaceText('5days') + _time, _class: _class };
                if (_class === 'ical_6days') return { text: this.replaceText('6days') + _time, _class: _class };
                if (_class === 'ical_oneweek') return { text: this.replaceText('oneweek') + _time, _class: _class };
            }
        } else {
            _class = 'ical_today';
            var daysleft = Math.round((_end.getDate() - new Date().getDate()) / (1000 * 60 * 60 * 24));
            var hoursleft = Math.round((_end.getDate() - new Date().getDate()) / (1000 * 60 * 60));

            if (this.config.replacedates) {
                var _left = this.replaceText('left') !== ' ' ? ' ' + this.replaceText('left') : '';
                var text;
                if (daysleft === 42) {
                    text = this.replaceText('6week_left');
                } else if (daysleft === 35) {
                    text = this.replaceText('5week_left');
                } else if (daysleft === 28) {
                    text = this.replaceText('4week_left');
                } else if (daysleft === 21) {
                    text = this.replaceText('3week_left');
                } else if (daysleft === 14) {
                    text = this.replaceText('2week_left');
                } else if (daysleft === 7) {
                    text = this.replaceText('1week_left');
                } else if (daysleft >= 1) {
                    if (this.config.language === 'ru') {
                        var c = daysleft % 10;
                        var cc = Math.floor(daysleft / 10) % 10;
                        if (daysleft === 1) {
                            text = (this.replaceText('still') !== ' ' ? this.replaceText('still') : '') + ' ' + daysleft + ' ' + this.replaceText('day') + _left;
                        } else if (cc > 1 && (c > 1 || c < 5)) {
                            text = (this.replaceText('still') !== ' ' ? this.replaceText('still') : '') + ' ' + daysleft + ' ' + 'дня' + _left;
                        } else {
                            text = (this.replaceText('still') !== ' ' ? this.replaceText('still') : '') + ' ' + daysleft + ' ' + this.replaceText('days') + _left;
                        }
                    } else {
                        text =
                            (this.replaceText('still') !== ' ' ? this.replaceText('still') : '') +
                            ' ' +
                            daysleft +
                            ' ' +
                            (daysleft === 1 ? this.replaceText('day') : this.replaceText('days')) +
                            _left;
                    }
                } else {
                    if (this.config.language === 'ru') {
                        var c = hoursleft % 10;
                        var cc = Math.floor(hoursleft / 10) % 10;
                        if (hoursleft === 1) {
                            text = (this.replaceText('still') !== ' ' ? this.replaceText('still') : '') + ' ' + hoursleft + ' ' + this.replaceText('hour') + _left;
                        } else if (cc !== 1 && (c > 1 || c < 5)) {
                            text = (this.replaceText('still') !== ' ' ? this.replaceText('still') : '') + ' ' + hoursleft + ' ' + 'часа' + _left;
                        } else {
                            text = (this.replaceText('still') !== ' ' ? this.replaceText('still') : '') + ' ' + hoursleft + ' ' + this.replaceText('hours') + _left;
                        }
                    } else {
                        text =
                            (this.replaceText('still') !== ' ' ? this.replaceText('still') : '') +
                            ' ' +
                            hoursleft +
                            ' ' +
                            (hoursleft === 1 ? this.replaceText('hour') : this.replaceText('hours')) +
                            _left;
                    }
                }
            } else {
                day = _end.getDate();
                if (fullday) {
                    day -= 1;
                    withTime = false;
                }
                month = _end.getMonth() + 1;
                year = _end.getFullYear();

                if (day < 10) day = '0' + day.toString();
                if (month < 10) month = '0' + month.toString();

                text = day + '.' + month + '.';
                text += year;

                if (withTime) {
                    let endhours = _end.getHours().toString();
                    let endminutes = _end.getMinutes().toString();

                    if (parseInt(endhours) < 10) {
                        endhours = '0' + endhours.toString();
                    }
                    if (parseInt(endminutes) < 10) {
                        endminutes = '0' + endminutes.toString();
                    }
                    text += ' ' + endhours + ':' + endminutes;
                }
            }

            return { text: text, _class: _class };
        }

        if (day < 10) day = '0' + day.toString();
        if (month < 10) month = '0' + month.toString();

        return {
            text: (day + '.' + month + '.' + year + _time).trim(),
            _class: _class,
        };
    }


    private replaceText(text: string) {
        if (!text) return '';

        if (this.dictionary[text]) {
            var newText = this.dictionary[text][this.config.language];
            if (newText) {
                return newText;
            } else if (this.config.language !== 'en') {
                newText = this.dictionary[text].en;
                if (newText) {
                    return newText;
                }
            }
        }
        return text;
    }

    private dictionary: any = {
        today: {
            en: 'Today',
            it: 'Oggi',
            es: 'Hoy',
            pl: 'Dzisiaj',
            fr: "Aujourd'hui",
            de: 'Heute',
            ru: 'Сегодня',
            nl: 'Vandaag',
        },
        tomorrow: {
            en: 'Tomorrow',
            it: 'Domani',
            es: 'Mañana',
            pl: 'Jutro',
            fr: 'Demain',
            de: 'Morgen',
            ru: 'Завтра',
            nl: 'Morgen',
        },
        dayafter: {
            en: 'Day After Tomorrow',
            it: 'Dopodomani',
            es: 'Pasado mañana',
            pl: 'Pojutrze',
            fr: 'Après demain',
            de: 'Übermorgen',
            ru: 'Послезавтра',
            nl: 'Overmorgen',
        },
        '3days': {
            en: 'In 3 days',
            it: 'In 3 giorni',
            es: 'En 3 días',
            pl: 'W 3 dni',
            fr: 'Dans 3 jours',
            de: 'In 3 Tagen',
            ru: 'Через 2 дня',
            nl: 'Over 3 dagen',
        },
        '4days': {
            en: 'In 4 days',
            it: 'In 4 giorni',
            es: 'En 4 días',
            pl: 'W 4 dni',
            fr: 'Dans 4 jours',
            de: 'In 4 Tagen',
            ru: 'Через 3 дня',
            nl: 'Over 4 dagen',
        },
        '5days': {
            en: 'In 5 days',
            it: 'In 5 giorni',
            es: 'En 5 días',
            pl: 'W ciągu 5 dni',
            fr: 'Dans 5 jours',
            de: 'In 5 Tagen',
            ru: 'Через 4 дня',
            nl: 'Over 5 dagen',
        },
        '6days': {
            en: 'In 6 days',
            it: 'In 6 giorni',
            es: 'En 6 días',
            pl: 'W ciągu 6 dni',
            fr: 'Dans 6 jours',
            de: 'In 6 Tagen',
            ru: 'Через 5 дней',
            nl: 'Over 6 dagen',
        },
        oneweek: {
            en: 'In one week',
            it: 'In una settimana',
            es: 'En una semana',
            pl: 'W jeden tydzień',
            fr: 'Dans une semaine',
            de: 'In einer Woche',
            ru: 'Через неделю',
            nl: 'Binnen een week',
        },
        '1week_left': {
            en: 'One week left',
            it: 'Manca una settimana',
            es: 'Queda una semana',
            pl: 'Został jeden tydzień',
            fr: 'Reste une semaine',
            de: 'Noch eine Woche',
            ru: 'Ещё неделя',
            nl: 'Over een week',
        },
        '2week_left': {
            en: 'Two weeks left',
            it: 'Due settimane rimaste',
            es: 'Dos semanas restantes',
            pl: 'Zostały dwa tygodnie',
            fr: 'Il reste deux semaines',
            de: 'Noch zwei Wochen',
            ru: 'Ещё две недели',
            nl: 'Over twee weken',
        },
        '3week_left': {
            en: 'Three weeks left',
            it: 'Tre settimane rimanenti',
            es: 'Tres semanas quedan',
            pl: 'Pozostały trzy tygodnie',
            fr: 'Trois semaines restantes',
            de: 'Noch drei Wochen',
            ru: 'Ещё три недели',
            nl: 'Over drie weken',
        },
        '4week_left': {
            en: 'Four weeks left',
            it: 'Quattro settimane rimaste',
            es: 'Cuatro semanas quedan',
            pl: 'Pozostały cztery tygodnie',
            fr: 'Quatre semaines à gauche',
            de: 'Noch vier Wochen',
            ru: 'Ещё три недели',
            nl: 'Over vier weken',
        },
        '5week_left': {
            en: 'Five weeks left',
            it: 'Cinque settimane rimaste',
            es: 'Quedan cinco semanas',
            pl: 'Pozostało pięć tygodni',
            fr: 'Cinq semaines à gauche',
            de: 'Noch fünf Wochen',
            ru: 'Ещё пять недель',
            nl: 'Over vijf weken',
        },
        '6week_left': {
            en: 'Six weeks left',
            it: 'Sei settimane a sinistra',
            es: 'Seis semanas restantes',
            pl: 'Pozostało sześć tygodni',
            fr: 'Six semaines à gauche',
            de: 'Noch sechs Wochen',
            ru: 'Ещё шесть недель',
            nl: 'Over zes weken',
        },
        left: {
            en: 'left',
            it: 'sinistra',
            es: 'izquierda',
            pl: 'lewo',
            fr: 'la gauche',
            de: ' ',
            ru: 'осталось',
            nl: 'over',
        },
        still: { en: ' ', it: '', es: '', pl: '', fr: '', de: 'Noch', ru: ' ', nl: 'nog' },
        days: { en: 'days', it: 'Giorni', es: 'dias', pl: 'dni', fr: 'journées', de: 'Tage', ru: 'дней', nl: 'dagen' },
        day: { en: 'day', it: 'giorno', es: 'día', pl: 'dzień', fr: 'journée', de: 'Tag', ru: 'день', nl: 'dag' },
        hours: {
            en: 'hours',
            it: 'ore',
            es: 'horas',
            pl: 'godziny',
            fr: 'heures',
            de: 'Stunden',
            ru: 'часов',
            nl: 'uren',
        },
        hour: { en: 'hour', it: 'ora', es: 'hora', pl: 'godzina', fr: 'heure', de: 'Stunde', ru: 'час', nl: 'uur' },
    };
}