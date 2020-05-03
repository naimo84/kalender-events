import { KalenderEvents } from "kalender-events";

const ev = new KalenderEvents({
    url: "https://calendar.google.com/calendar/ical/jjch92ld311iekcgnf0t5pndvg%40group.calendar.google.com/private-12a276e45e9ea17c6d31c6b593059880/basic.ics"
});

ev.getEvents({
    preview: 10,
    previewUnits:'days',
    pastview: 10,
    pastviewUnits:'days'
}).then(data => {
    console.log(data);
})