# kalender-events (ka'lɛndɐ, german for calendar)

This Node module gets the events from an ical-URL, a caldav-server or from the iCloud.

## :question: Get Help

For bug reports and feature requests, open issues. :bug:

## :sparkling_heart: Support my projects

I open-source almost everything I can, and I try to reply to everyone needing help using these projects. Obviously,
this takes time. You can integrate and use these projects in your applications _for free_! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, there are few ways you can do it:

-   Starring and sharing the projects you like :rocket:
-   [![PayPal][badge_paypal]][paypal-donations] **PayPal**— You can make one-time donations via PayPal. I'll probably buy a ~~coffee~~ tea. :tea:
-   [![Support me on using Brave Browser][badge_brave]][brave] **Brave**— It's free for you. Brave is a browser that improves the security and the access time of websites by blocking ads, trackers and scripts. Give the new Brave Browser a try and Brave will contribute to me on your behalf. :wink:
-   [![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/T6T412CXA) **Ko-fi**— I'll buy a ~~tea~~ coffee. :coffee: :wink:
-   ![](./examples/bitcoin.png) **Bitcoin**—You can send me bitcoins at this address (or scanning the code): `3KDjCmXsGFYawmycXRsVwfFbphog117N8P`

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

- url: string (URL to Calendar)
- language: string (if dates are replaced with names, the following languages are available at the moment Deutsch, English, русский, polski, Nederlands, français, Italiano, Espanol)
- replacedates: boolean (Dates are formated in a readable way, like today, tommorrow, in 3 weeks,...)
- type: string (ical, icloud, caldav)
- username: string (optional)
- password: string (optional)
- calendar: string (Name of the caldav calendar)
- filter: string, Regex to filter for
- trigger: string (always, match, nomatch)
- preview: number
- previewUnits: string (seconds, minutes, hours, days)
- pastview: number
- pastviewUnits: string (seconds, minutes, hours, days)

### OUTPUT

arraylist of upcoming events:
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



## :scroll: The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Coded with :heart: in :cloud:

[badge_brave]: ./examples/support_banner.png
[badge_paypal]: https://img.shields.io/badge/Donate-PayPal-blue.svg
[paypal-donations]: https://paypal.me/NeumannBenjamin
[brave]: https://brave.com/nai412
[contributing]: /CONTRIBUTING.md
