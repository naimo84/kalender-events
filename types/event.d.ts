
export interface iCalEvent {
    startDate?: any;
    endDate?: any;
    recurrenceId?: any;
    item?: any;
    type?: string;
    duration?: any;
    attendees?: any;
    organizer?: string;
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
    location?: string,
    eventStart?: Date
    eventEnd?: Date,
    date?: string,
    event?: string,
    description?: string,
    id?: string,
    allDay?: boolean,
    rule?: string,   
    countdown?: object,
    calendarName?: string,
    uid?: string,
    duration?: number,
    durationSeconds?:number,
    organizer?:string,
    isRecurring?:boolean,
    datetype?:string,
    attendees?:any
}