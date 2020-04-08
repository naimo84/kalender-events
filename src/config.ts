
export interface Config  {
    rejectUnauthorized?: boolean;    
    url?: string,
    language?: string,
    replacedates?: boolean,
    caldav?: string,
    username?: string,
    password?: string,
    calendar?: string,  
    filter?: string,
    trigger?: string,
    endpreview?: number,
    endpreviewUnits?: string,
    preview?: number,
    previewUnits?: string,
    pastview?: number,
    pastviewUnits?: string,
    offsetUnits?:string,
    offset?: number
}