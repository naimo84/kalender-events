import moment from 'moment';
import { duration } from 'moment'
import { Config, IKalenderEvent } from './interfaces';


export function isAllDay(event: any, startDate: Date, endDate: Date): boolean {
    let allday = false;
    if (!event.duration) {
        var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
        seconds = Number(seconds);
        allday = ((seconds % 86400) === 0)
    } else {
        /* istanbul ignore else */
        if (/(-)?P(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?(?:T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?)?/.test(event.duration)) {
            allday = ((duration(event.duration).asSeconds() % 86400) === 0)
        }
        else {
            allday = ((event.duration.toSeconds() % 86400) === 0)
        }
    }

    return allday;
}


/* istanbul ignore next */
export function insertSorted(arr: IKalenderEvent[], element: IKalenderEvent) {
    if (!arr.length) {
        arr.push(element);
    } else {
        if (arr[0].eventStart! > element.eventStart!) {
            arr.unshift(element);
        } else if (arr[arr.length - 1].eventStart! < element?.eventStart!) {
            arr.push(element);
        } else {
            if (arr.length === 1) {
                arr.push(element);
            } else {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].uid!.uid == element.uid?.uid && element.eventStart!.getTime() == arr[i].eventStart?.getTime()) {
                        //@ts-ignore
                        element = null;
                        break;
                    }
                }
                if (element) {
                    for (var i = 0; i < arr.length - 1; i++) {
                        if (arr[i].eventStart! <= element?.eventStart! && element?.eventStart! < arr[i + 1].eventStart!) {
                            arr.splice(i + 1, 0, element);
                            //@ts-ignore
                            element = null;
                            break;
                        }
                    }
                }
                if (element) arr.push(element);
            }
        }
    }
}

export function getTimezoneOffset(date: Date) {
    const isoDate = date.toISOString();
    var offset = moment(isoDate).utcOffset();
    return -offset;
}

export function getPreviews(config: Config): { preview: moment.Moment, pastview: moment.Moment } {
    let preview = new Date();
    let pastview = new Date();
    if (config && config.now) {
        preview = pastview = moment(config.now).toDate();
    }
    let preMoment = moment(preview);
    let previewDuration = moment.duration(JSON.parse(`{"${config.previewUnits}" : "${config.preview === 1 && config.previewUnits === 'days' ? config.preview - 1 : config.preview}" }`));
    if (typeof config.preview === 'string' && Number.isNaN(Number.parseInt(config.preview))) {
        if (/^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$/.test(config.preview as string)) {
            previewDuration = moment.duration(config.preview as string)
        }
        else {
            throw new Error('preview must be a duration string or a number');
        }
    } else if (typeof config.preview === 'number' && !Number.isNaN(config.preview)) {
        if (previewDuration.days() > 0 || config.preview === 1 && config.previewUnits === 'days') {
            preMoment = preMoment.endOf('day')
        } else if (previewDuration.hours() > 0) {
            preMoment = preMoment.endOf('hour')
        } else if (previewDuration.minutes() > 0) {
            preMoment = preMoment.endOf('minute')
        } else if (previewDuration.seconds() > 0) {
            preMoment = preMoment.endOf('second')
        }
    } else {
        throw new Error('preview must be a duration string or a number');
    }

    const pre: moment.Moment = preMoment.add(previewDuration)

    let pastMoment = moment(pastview);
    let pastviewDuration = moment.duration(JSON.parse(`{"${config.pastviewUnits}" : "${config.pastview === 1 && config.pastviewUnits === 'days' ? config.pastview - 1 : config.pastview}" }`));
    if (typeof config.pastview === 'string' && Number.isNaN(Number.parseInt(config.pastview))) {
        if (/^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$/.test(config.pastview as string)) {
            pastviewDuration = moment.duration(config.pastview)
        } else {
            throw new Error('pastview must be a duration string or a number');
        }
    } else if (typeof config.pastview === 'number' && !Number.isNaN(config.pastview)) {
        if (pastviewDuration.days() > 0 || config.pastview === 1 && config.pastviewUnits === 'days') {
            pastMoment = pastMoment.startOf('day')
        } else if (pastviewDuration.hours() > 0) {
            pastMoment = pastMoment.startOf('hour')
        } else if (pastviewDuration.minutes() > 0) {
            pastMoment = pastMoment.startOf('minute')
        } else if (pastviewDuration.seconds() > 0) {
            pastMoment = pastMoment.startOf('second')
        }
    } else {
        throw new Error('pastview must be a duration string or a number');
    }
    const past: moment.Moment = pastMoment.subtract(pastviewDuration);
    return { preview: pre, pastview: past };
}
