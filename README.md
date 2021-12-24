# kalender-events (ka'lɛndɐ, german for calendar) <img src="https://github.com/naimo84/kalender-events/blob/master/docs/logo.png" width="200" align="right" alt="kalender-events">

This Node module gets the events from an ical-URL, a caldav-server or from the iCloud.
Special thanks to Peter Braden (https://github.com/peterbraden/ical.js) and Jens Maus (https://github.com/jens-maus/node-ical) for the whole ical parsing code :+1:

## :question: Get Help

For bug reports and feature requests, open issues. :bug:

## :sparkling_heart: Support my projects

I open-source almost everything I can, and I try to reply to everyone needing help using these projects. Obviously,
this takes time. You can integrate and use these projects in your applications _for free_! You can even change the source code and redistribute (even resell it).

Thank you to all my backers!
### People

![backers](https://github.com/naimo84/kalender-events/blob/main/backers.svg)

### Become a backer

However, if you get some profit from this or just want to encourage me to continue creating stuff, there are few ways you can do it:

- Starring and sharing the projects you like :rocket:
- **Crypto.&#65279;com** Use my referral link https://crypto.com/app/f2smbah8fm to sign up for Crypto.&#65279;com and we both get $25 USD :) 
- [![PayPal][badge_paypal]][paypal-donations] **PayPal**— You can make one-time donations via PayPal. I'll probably buy a ~~coffee~~ tea. :tea:
- [![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/T6T412CXA) **Ko-fi**— I'll buy a ~~tea~~ coffee. :coffee: :wink:
- <img src="./docs/bitcoin.png" width="50"/>&nbsp; **Bitcoin**—You can send me bitcoins at this address (or scanning the code): `3GqiebqcZeonziRUMYxU35J3jPSMJzpTAc`

Thanks! :heart:

## :cloud: Installation

```sh
$ npm install kalender-events
```

## :yum: How to contribute

Have an idea? Found a bug? See [how to contribute][contributing].

```sh
git clone https://github.com/naimo84/kalender-events.git
cd kalender-events
npm install
gulp
cd /your/project/path
npm install /path/to/kalender-events
```

## :memo: Documentation

### INPUT

- **url**: _string_ (URL to Calendar)
- **language**: _string_ (if dates are replaced with names, the following languages are available at the moment Deutsch, English, русский, polski, Nederlands, français, Italiano, Espanol)
- **replacedates**: _boolean_ (Dates are formated in a readable way, like today, tommorrow, in 3 weeks,...)
- **type**: _string_ (ical, icloud, caldav). default is ical
- **username**: _string_ (optional)
- **password**: _string_ (optional)
- **calendar**: _string_ (Name of the caldav calendar)
- **filter**: _string_, Regex to filter for
- **trigger**: _string_ (always, match, nomatch)
- **preview**: _number_
- **previewUnits**: _string_ (seconds, minutes, hours, days)
- **pastview**: _number_
- **pastviewUnits**: _string_ (seconds, minutes, hours, days)

> :warning: **If you are using iCloud**: Have a look here: [wiki/Get-iCloud-secure-URL](https://github.com/naimo84/kalender-events/wiki/Get-iCloud-secure-URL)

### OUTPUT

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

### Example:

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

or

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

output:  
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

## :scroll: The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Coded with :heart: in :cloud:

[badge_brave]: ./docs/support_banner.png
[badge_paypal]: https://img.shields.io/badge/Donate-PayPal-blue.svg
[paypal-donations]: https://paypal.me/NeumannBenjamin
[brave]: https://brave.com/nai412
[contributing]: /CONTRIBUTING.md
