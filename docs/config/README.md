# Configuration

## url

- Type: `string`
- Default: `undefined`

URL to Calendar

::: warning
**If you are using iCloud**: Have a look here: [link](https://naimo84.github.io/kalender-events/guide/icloudsecure.html)
:::


## language

- Type: `string`
- Default: `en`

if dates are replaced with names, the following languages are available at the moment Deutsch, English, русский, polski, Nederlands, français, Italiano, Espanol

## replacedates

- Type: `boolean`
- Default: `false`

Dates are formated in a readable way, like today, tommorrow, in 3 weeks,...

## type

- Type: `string`
- Default: `ical`

ical, icloud, caldav
## username

- Type: `string`
- Default: `undefined`

optional
## password

- Type: `string`
- Default: `undefined`

optional
## calendar

- Type: `string`
- Default: `undefined`

Name of the caldav calendar
## filter

- Type: `string`
- Default: `undefined`

Regex to filter for
## trigger

- Type: `string`
- Default: `always`

always, match, nomatch
## preview

- Type: `number`
- Default: `10`
## previewUnits

- Type: `string`
- Default: `days`

seconds, minutes, hours, days
## pastview

- Type: `number`
- Default: `10`

## pastviewUnits

- Type: `string`
- Default: `days`

seconds, minutes, hours, days


# OUTPUT

arraylist of upcoming events.  
properties:

    -   date
    -   summary
    -   event
    -   eventStart
    -   eventEnd
    -   description
    -   id
    -   allDay
    -   rule
    -   location
