
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