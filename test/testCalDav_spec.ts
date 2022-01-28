
import { expect, use } from "chai";
import moment = require('moment');
import { KalenderEvents } from '../dist';
use(require('chai-like'));
use(require('chai-things'));

describe('caldav', () => {
    it('preview = pastview = 1', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!process.env.CALDAV1_URL) resolve();
                let ke = new KalenderEvents({
                    url: process.env.CALDAV1_URL,
                    username: process.env.CALDAV1_USERNAME,
                    password: process.env.CALDAV1_PASSWORD,
                    type: 'caldav'
                });
                let events = await ke.getEvents({
                    now: moment('20210101').toDate(),
                    pastview: 1,
                    preview: 1
                });
                expect(events).to.have.lengthOf(1)
                expect(events[0].summary).to.equal('kalender-events');
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });

    it('preview = 0, pastview = 24h', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!process.env.CALDAV1_URL) resolve();
                let ke = new KalenderEvents({
                    url: process.env.CALDAV1_URL,
                    username: process.env.CALDAV1_USERNAME,
                    password: process.env.CALDAV1_PASSWORD,
                    type: 'caldav'
                });
                let events = await ke.getEvents({
                    now: moment('2022-01-28T14:00:00').toDate(),
                    pastview: 0,
                    pastviewUnits: 'days',
                    preview: 24,
                    previewUnits: 'hours'
                });
                expect(events).to.have.lengthOf(0)
              
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });

    it('todos', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!process.env.CALDAV1_URL) resolve();
                let ke = new KalenderEvents({
                    url: process.env.CALDAV1_URL,
                    username: process.env.CALDAV1_USERNAME,
                    password: process.env.CALDAV1_PASSWORD,
                    type: 'caldav'
                });
                let events = await ke.getEvents({
                    now: moment('20210623').toDate(),
                    pastview: 1,
                    preview: 1,
                    includeTodo: true
                });
                expect(events).to.have.lengthOf(1)
                expect(events[0].summary).to.equal('test-2');
                expect(events[0].datetype).to.equal('todo');
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });

    it('todos #2', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!process.env.CALDAV1_URL) resolve();
                let ke = new KalenderEvents({
                    url: process.env.CALDAV1_URL,
                    username: process.env.CALDAV1_USERNAME,
                    password: process.env.CALDAV1_PASSWORD,
                    type: 'caldav'
                });
                let events = await ke.getEvents({
                    now: moment('20220116').toDate(),
                    pastview: 2,
                    preview: 2,
                    eventtypes: 'todos'
                });
                expect(events).to.have.lengthOf(1)
                expect(events[0].datetype).to.equal('todo');
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });

    it('todos #3', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!process.env.CALDAV1_URL) resolve();
                let ke = new KalenderEvents({
                    url: process.env.CALDAV1_URL,
                    username: process.env.CALDAV1_USERNAME,
                    password: process.env.CALDAV1_PASSWORD,
                    type: 'caldav'
                });
                let events = await ke.getEvents({
                    now: moment('20220116').toDate(),
                    pastview: 2,
                    preview: 2,
                    eventtypes: 'todos,events'
                });
                expect(events).to.have.lengthOf(2)
                expect(events[0].datetype).to.be.oneOf(['todo', 'date']);
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });
});

