
export interface Config {
    usecache?: boolean;
    rejectUnauthorized?: boolean;
    url?: string,
    language?: string,
    replacedates?: boolean,
    type?: "icloud" | "caldav" | "ical",
    username?: string,
    password?: string,
    calendar?: string,
    filter?: string,
    filter2?: string,
    filterProperty?: string,
    filterOperator?:string,
    trigger?: string,
    preview?: number,
    previewUnits?: string,
    pastview?: number,
    pastviewUnits?: string
    offsetUnits?:string,
    offset?: number,
}