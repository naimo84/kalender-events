
import { expect, should, use } from "chai";
import nodeIcal = require('node-ical');

var sinon = require('sinon');
import moment = require('moment');
import { KalenderEvents } from '../dist/lib';
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
    

    it('fallback', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!process.env.CALDAV2_URL) resolve();
                let ke = new KalenderEvents({
                    url: 'http://example.com/',
                    username: 'test',
                    password: 'test',
                    type: 'caldav'
                });
                let events = await ke.getEvents({
                    now: moment('20211130').toDate(),
                    pastview: 1,
                    preview: 1,
                    includeTodo: true
                });
                reject();
            } catch (err) {
                expect(err).to.contain('get calendar went wrong');
                resolve();
            }
        });
    });
});

