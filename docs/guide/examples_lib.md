# Use as libary

## Typescript

```ts
//Typescript - index.ts

import { KalenderEvents } from "kalender-events";

const ev = new KalenderEvents({
    url: "https://calendar.google.com/calendar/ical/xxx%40group.calendar.google.com/private-xxx/basic.ics"
});

ev.getEvents({
    type: 'ical',
    preview: 10,
    previewUnits:'days',
    pastview: 10,
    pastviewUnits:'days'
}).then(data => {
    console.log(data);
})
```

## Javascript

```js
//Javascript - index.js

var kalender_events = require("kalender-events");
var ev = new kalender_events.KalenderEvents({
    url: "https://calendar.google.com/calendar/ical/xxx%40group.calendar.google.com/private-xxx/basic.ics"
});

ev.getEvents({
    type: 'ical',
    preview: 10,
    previewUnits: 'days',
    pastview: 10,
    pastviewUnits: 'days'
}).then(function (data) {
    console.log(data);
});
```

## output
```sh
$ tsc index.ts
$ node .\index.js
[
  {
    date: '02.05.2020 10:00',
    event: 'test',
    summary: 'test',
    topic: 'test',
    calendarName: undefined,
    eventStart: 2020-05-02T07:00:00.000Z,
    eventEnd: 2020-05-02T08:00:00.000Z,
    description: '',
    id: '123@google.com',
    allDay: false,
    rule: ' ',
    location: '',
    countdown: { days: -1, hours: -7, minutes: -26, seconds: -38 }
  }
]
```