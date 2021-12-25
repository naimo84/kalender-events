---
sidebar: auto
---

# Configuration

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

> :warning: **If you are using iCloud**: Have a look here: [wiki/Get-iCloud-secure-URL](https://naimo84.github.io/kalender-events/guide/icloudsecure.html)

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

### Example (Google):

Under settings and sharing you can find a public and a private URL for your calendar.  
Warning: The public address won't work unless this calendar is public.  

![google_example_1.png](https://github.com/naimo84/node-red-contrib-ical-events/raw/master/examples/google_example_1.png)  
![google_example_2.png](https://github.com/naimo84/node-red-contrib-ical-events/raw/master/examples/google_example_2.png)  

If you've copied the URL, add a new ical config and paste the URL into the first textbox.  

![google_example_3.png](https://github.com/naimo84/node-red-contrib-ical-events/raw/master/examples/google_example_3.png)  
![google_example_4.png](https://github.com/naimo84/node-red-contrib-ical-events/raw/master/examples/google_example_4.png)  


That's it :wink:  
![example.png](https://github.com/naimo84/node-red-contrib-ical-events/raw/master/examples/example.png)
