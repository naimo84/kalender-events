import moment = require('moment');
import { ICloud } from './icloud';
import { CalDav, Fallback } from './caldav';
import { Config } from './interfaces/config';
import { parseFile, fromURL } from './ical';
import * as NodeCache from 'node-cache';
import { IKalenderEvent } from './interfaces';
import { formatDate } from './format';
import { getPreviews, getTimezoneOffset, insertSorted } from './helper';
import { convertEvent, convertEvents } from './convert';
import { getPackageVersion, parseJson } from './utils/configUtils';
import { join } from 'path';
var debug = require('debug')('kalender-events')
var RRule = require('rrule').RRule;
var ce = require('cloneextend');
export interface Job {
    id: string,
    cronjob: any
}
export class KalenderEvents {
    private cache: NodeCache;
    private config: Config = {};

    constructor(config?: Config) {
        if (config)
            this.config = config;

        this.calcPrePastView();
        this.cache = this.config.cache ? this.config.cache : new NodeCache.default();

    }

    private calcPrePastView() {
        if (this.config.pastview === undefined) this.config.pastview = 10;
        if (this.config.pastviewUnits === undefined) this.config.pastviewUnits = "days";
        if (this.config.preview === undefined) this.config.preview = 10;
        if (this.config.previewUnits === undefined) this.config.previewUnits = "days"

        this.config.pastviewUnits = this.config.pastviewUnits.toLocaleLowerCase();
        this.config.previewUnits = this.config.previewUnits.toLocaleLowerCase();
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
        /* istanbul ignore else */
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

        var seconds = (new Date(date).getTime() - new Date().getTime()) / 1000;
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

    public async getEvents(config?: Config): Promise<IKalenderEvent[]> {
        try {

            const packageJson = await parseJson<Record<string, string>>(join(__dirname, '../package.json'));
            debug(`packageJson version: ${packageJson?.version}`)

            if (config) {
                this.config = Object.assign(this.config, config);
            }
            this.config.includeEvents = this.config.eventtypes !== undefined && this.config.eventtypes !== '' ? this.config.eventtypes?.indexOf('events') >= 0 : true;
            this.config.includeTodo = this.config.eventtypes !== undefined && this.config.eventtypes !== '' ? this.config.eventtypes?.indexOf('todos') >= 0 : this.config.includeTodo;
            this.calcPrePastView();
            let data = await this.getCal();
            let realnow = new Date();

            if (config && config.now) {
                realnow = moment(config.now).toDate();
            }

            const { preview, pastview } = getPreviews(this.config as Config);

            debug(`getEvents - pastview: ${pastview}`)
            debug(`getEvents - preview: ${preview}`)
            let processedData = this.processData(data, realnow, pastview.toDate(), preview.toDate());
            debug(`getEvents - processedData: ${JSON.stringify(processedData)}`)

            if (this.config.usecache && this.cache) {
                if (data) {
                    this.cache.set("events", processedData);
                }
            }
            return processedData;
        } catch (err) {
            if (this.config.usecache && this.cache) {
                return this.cache.get("events") as IKalenderEvent[];
            }
            throw err;
        }
    }

    private async getCal(): Promise<IKalenderEvent[]> {
        if (this.config.type && this.config.type === 'icloud') {
            debug('getCal - icloud');

            try {
                let list = await ICloud(this.config);
                return list;
            } catch (err) {
                debug(err);
                throw err;
            }
        } else if (this.config.type && this.config.type === 'caldav') {
            debug('getCal - caldav');

            try {
                let data = await CalDav(this.config);
                return data;
            }
            catch (err) {
                debug(`getCal - caldav - get calendar went wrong. Error Message: ${err}`)
                debug(`getCal - caldav - using fallback`)

                try {
                    let data = await Fallback(this.config)
                    return data;
                }
                catch (err_fallback) {
                    throw (`caldav - get calendar went wrong. Error Message: ${err_fallback}`)
                }
            };
        } else {
            debug('getCal - ical');

            if (this.config?.url?.match(/^webcal:\/\//)) {
                this.config.url = this.config.url.replace("webcal", "https")
            }

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

                let data = await fromURL(this.config.url, header);
                debug(data)

                let converted = await convertEvents(data, this.config);
                return converted;
            } else {
                /* istanbul ignore if */
                if (!this.config.url) {
                    throw "URL/File is not defined";
                }
                let data = await parseFile(this.config.url);
                debug(data)
                let converted = await convertEvents(data, this.config);
                return converted;
            }
        }
    }

    private processRRule(ev: IKalenderEvent, preview: Date, pastview: Date) {
        var eventLength = ev.eventEnd!.getTime() - ev.eventStart!.getTime();
        var options = RRule.parseString(ev.rrule.toString());
        options.dtstart = this.addOffset(ev.eventStart!, -getTimezoneOffset(ev.eventStart!));
        if (options.until) {
            options.until = this.addOffset(options.until, -getTimezoneOffset(options.until));
        }
        debug('options:' + JSON.stringify(options));

        var rule = new RRule(options);
        debug(
            'processRRule - RRule event:' +
            ev.summary +
            '; start:' +
            ev.eventStart?.toString() +
            '; preview:' +
            preview.toString() +
            '; today:' +
            pastview +
            '; rule:' +
            JSON.stringify(rule)
        );

        var dates = [];
        try {
            dates = rule.between(pastview, preview, true);
        } catch (e) {
            throw (
                'Issue detected in RRule, event ignored; ' +
                (e as any).stack +
                '\n' +
                'RRule object: ' +
                JSON.stringify(rule) +
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

        debug('processRRule - dates:' + JSON.stringify(dates));
        let reslist = [];
        if (dates.length > 0) {
            for (var i = 0; i < dates.length; i++) {
                var ev2: IKalenderEvent = ce.clone(ev);
                var start = dates[i];
                ev2.eventStart = this.addOffset(start, getTimezoneOffset(start));

                var end = new Date(start.getTime() + eventLength);
                ev2.eventEnd = this.addOffset(end, getTimezoneOffset(end));

                if (ev2.alarms && ev2.alarms.length > 0) {
                    for (let alarm of ev2.alarms) {
                        alarm.triggerParsed = moment(ev2.eventStart).add(moment.duration(alarm.trigger).asSeconds(), 'seconds').toDate()
                    }
                }

                debug('processRRule - ' + i + ': Event (' + JSON.stringify(ev2.exdate) + '):' + ev2.eventStart.toString() + ' ' + ev2.eventEnd.toString());

                var checkDate = true;
                if (ev2.exdate) {
                    for (var d in ev2.exdate) {
                        if (ev2.exdate[d] && (typeof ev2.exdate[d].getTime === 'function') && ev2.exdate[d].getTime() === ev2.eventStart.getTime()) {
                            checkDate = false;
                            debug('processRRule - ' + i + ': sort out');
                            break;
                        }
                    }
                }
                if (checkDate && ev.recurrences) {
                    for (var dOri in ev.recurrences) {
                        let recurrenceid = ev.recurrences[dOri].recurrenceid
                        if (recurrenceid && (typeof recurrenceid.getTime === 'function')) {
                            if (recurrenceid.getTime() === ev2.eventStart?.getTime()) {
                                ev2 = convertEvent(ev.recurrences[dOri], this.config) as IKalenderEvent;
                                debug('processRRule - ' + i + ': different recurring found replaced with Event:' + ev2.eventStart + ' ' + ev2.eventEnd);
                            }
                        }
                    }
                }


                if (checkDate) {
                    let date = formatDate(ev2, ev2.eventStart as Date, ev2.eventEnd as Date, true, this.config);
                    ev2.date = date.trim();
                    reslist.push(ev2);
                }
            }
        } else if (ev.recurrences) {
            for (var dOri in ev.recurrences) {
                let recurrenceid = ev.recurrences[dOri].recurrenceid
                if (recurrenceid) {
                    let ev3 = ce.clone(ev.recurrences[dOri])
                    let ev1 = convertEvent(ev3, this.config);
                    if ((ev1?.eventStart! >= pastview && ev1?.eventStart! <= preview) || (ev1?.eventEnd! >= pastview && ev1?.eventEnd! <= preview)) {
                        let date = formatDate(ev1, ev1?.eventStart as Date, ev1?.eventEnd as Date, true, this.config);
                        ev1!.date = date.trim();
                        reslist.push(ev1);
                    }
                }
            }
        }
        return reslist;
    }

    private processData(data: IKalenderEvent[], realnow: Date, pastview: Date, preview: Date): IKalenderEvent[] {
        let reslist: IKalenderEvent[] = [];
        this.processDataRev(data, realnow, pastview, preview, reslist);
        return reslist;
    }

    private processDataRev(data: IKalenderEvent[], realnow: Date, pastview: Date, preview: Date, reslist: IKalenderEvent[]) {
        var processedEntries = 0;

        for (var k in data) {
            const ev: IKalenderEvent = data[k];
            delete data[k];
            debug(`processDataRev - event: ${JSON.stringify(ev)}`)
            if (ev !== undefined && ev.eventStart) {
                if (!ev.eventEnd) {
                    ev.eventEnd = ce.clone(ev.eventStart);
                    if (!ev.eventStart.getHours() && !ev.eventStart.getMinutes() && !ev.eventStart.getSeconds()) {
                        ev.eventEnd!.setDate(ev.eventEnd!.getDate() + 1);
                    }
                }

                if (ev.rrule === undefined) {
                    this.checkDates(ev, preview, pastview, realnow, ' ', reslist);
                } else {
                    let evlist = this.processRRule(ev, preview, pastview);
                    for (let ev2 of evlist) {
                        this.checkDates(ev2 as IKalenderEvent, preview, pastview, realnow, ev.rrule, reslist);
                    }

                }


                if (++processedEntries > 100) {
                    break;
                }
            }
        }
        if (!Object.keys(data).length) {
            return;
        } else {
            this.processDataRev(data, realnow, pastview, preview, reslist);
        }
    }


    private filterOutput(ev: IKalenderEvent) {
        let output = false;
        let filterProperty = ev.summary;

        if (this.config.filterProperty) {
            filterProperty = ev[this.config.filterProperty as keyof IKalenderEvent];
        }

        if (filterProperty) {
            if (this.config.trigger == 'match') {
                output = this.checkRegex(filterProperty)
            } else if (this.config.trigger == 'nomatch') {
                output = !this.checkRegex(filterProperty)
            } else {
                output = true;
            }
        } else if (this.config.trigger == 'always') {
            output = true;
        }
        return output;
    }


    private checkRegex(filterProperty: any) {
        if (this.config.filterProperty && this.config.filterProperty == "attendee") {
            let regex = new RegExp(this.config.filter || "");
            if (Array.isArray(filterProperty)) {
                for (const attendee of filterProperty) {
                    if (attendee.jCal && regex.test(attendee.jCal[1].cn)) {
                        return true;
                    }
                    if (attendee.params && regex.test(attendee.params.CN)) {
                        return true;
                    }
                }
            } else {
                return regex.test(filterProperty.params.CN)
            }
        } else if (this.config.filterProperty && this.config.filterProperty.indexOf("event") >= 0) {
            if (filterProperty instanceof Date) {
                switch (this.config.filterOperator) {
                    case 'before':
                        if (moment(filterProperty).isBefore(moment(this.config.filter, "YYYY-MM-DD_hh:mm:ss"))) {
                            return true;
                        }
                        break;
                    case 'after':
                        if (moment(filterProperty).isAfter(moment(this.config.filter, "YYYY-MM-DD_hh:mm:ss"))) {
                            return true;
                        }
                        break;
                    case 'between':
                        if (moment(filterProperty).isBetween(moment(this.config.filter, "YYYY-MM-DD_hh:mm:ss"), moment(this.config.filter2, "YYYY-MM-DD_hh:mm:ss"))) {
                            return true;
                        }
                        break;
                }
            }
        } else {
            let regex = new RegExp(this.config.filter || "");

            if (Array.isArray(filterProperty)) {
                for (const prop of filterProperty) {
                    if (regex.test(prop)) {
                        return true;
                    }
                }
            } else if (filterProperty instanceof Object && filterProperty.hasOwnProperty('val')) {
                return regex.test(filterProperty.val);
            } else {
                return regex.test(filterProperty);
            }
        }
        return false;
    }

    private checkDates(ev: IKalenderEvent, preview: Date, pastview: Date, realnow: Date, rule: string, reslist: IKalenderEvent[]) {
        var fullday = false;

        if (!ev.eventStart) return;
        if (!ev.eventEnd) ev.eventEnd = ev.eventStart;
        ev.eventStart = new Date(ev.eventStart);
        ev.eventEnd = new Date(ev.eventEnd);
        if (
            !ev.eventStart.getHours() &&
            !ev.eventStart.getMinutes() &&
            !ev.eventStart.getSeconds() &&
            !ev.eventEnd.getHours() &&
            !ev.eventEnd.getMinutes() &&
            !ev.eventEnd.getSeconds()
        ) {
            if (ev.eventEnd.getTime() == ev.eventStart.getTime() && ev.datetype == 'date') {
                ev.eventEnd.setDate(ev.eventEnd.getDate() + 1);
            }
            if (ev.eventEnd.getTime() !== ev.eventStart.getTime()) {
                fullday = true;
            }
        }

        let output = this.filterOutput(ev)
        if (output) {
            debug('checkDates - event: ' + JSON.stringify(ev))
            delete ev.recurrences;
            delete ev.exdate;
            //delete ev.rrule;
            if (fullday) {
                if (
                    (ev.eventStart < preview && ev.eventStart >= pastview) ||
                    (ev.eventEnd > pastview && ev.eventEnd <= preview) ||
                    (ev.eventStart < pastview && ev.eventEnd > pastview)
                ) {
                    insertSorted(reslist, ev);
                    debug('checkDates - Event (full day) added : ' + JSON.stringify(rule) + ' ' + ev.summary + ' at ' + ev.eventStart);
                }
            } else {
                // Event with time              
                if (
                    (ev.eventStart >= pastview && ev.eventStart < preview) ||
                    (ev.eventEnd >= realnow && ev.eventEnd <= preview) ||
                    (ev.eventStart < realnow && ev.eventEnd > realnow)
                ) {
                    insertSorted(reslist, ev);
                    debug('checkDates - Event with time added: ' + JSON.stringify(rule) + ' ' + ev.summary + ' at ' + ev.eventStart);
                }
            }
        }
    }

}

export function getVersion() {
    return getPackageVersion();
}