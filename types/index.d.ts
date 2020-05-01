
/** Declaration file generated by dts-gen */

export class KalenderEvents {
    constructor(config: any);

    addOffset(date: any, ...args: any[]): any;

    checkDates(ev: any, preview: any, pastview: any, realnow: any, rule: any, reslist: any): void;

    convertEvent(e: any): any;

    convertEvents(events: any): any;

    convertScrapegoat(e: any): any;

    countdown(date: any): any;

    formatDate(_date: any, _end: any, withTime: any, fullday: any): any;

    getCal(): any;

    getEvents(config: any): any;

    getTimezoneOffset(date: any): any;

    insertSorted(arr: any, element: any): void;

    processData(data: any, realnow: any, pastview: any, preview: any): any;

    processDataRev(data: any, realnow: any, pastview: any, preview: any, reslist: any): void;

    processRRule(ev: any, preview: any, today: any): any;

    replaceText(text: any): any;

    uuidv4(): any;

}
