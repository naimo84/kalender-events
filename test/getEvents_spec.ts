
import { expect, should, use } from "chai";
import nodeIcal = require('node-ical');

var sinon = require('sinon');
import moment = require('moment');
import { KalenderEvents } from '../dist/lib';
import { getEvents } from './test_helper';
use(require('chai-like'));
use(require('chai-things'));

describe('events', () => {
    before(async function () {
        let stub = sinon.stub(nodeIcal.async, "fromURL");
        let data = await nodeIcal.async.parseFile('./test/mocks/events.ics');
        stub.returns(data);
    });


    after(function () {
        nodeIcal.async.fromURL.restore();
    });

    it('ical - exdate', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let ke = new KalenderEvents({
                    url: "https://domain.com/calendar.ics"
                });
                let events = await ke.getEvents({
                    now: moment('20011123').toDate(),
                    pastview: 1,
                    preview: 1
                });
                expect(events).to.have.lengthOf(0)
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });

    it('ical - great preview', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let ke = new KalenderEvents({
                    url: "https://domain.com/calendar.ics"
                });
                let events = await ke.getEvents({
                    now: moment('20210325').toDate(),
                    pastview: 1,
                    preview: 14
                });
                expect(events).to.have.lengthOf(2)
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });

    it('ical - only today', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let ke = new KalenderEvents({
                    url: "https://domain.com/calendar.ics"
                });
                let events = await ke.getEvents({
                    now: moment('20200616').toDate(),
                    pastview: 1,
                    preview: 1
                });
                expect(events).to.have.lengthOf(1)
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });

    it('ical - weekly', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let ke = new KalenderEvents({
                    url: "https://domain.com/calendar.ics"
                });
                let events = await ke.getEvents({
                    now: moment('20211121').toDate(),
                    pastview: 1,
                    preview: 3
                });
                expect(events).to.have.lengthOf(2)
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });

    it('ical - location filter', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let ke = new KalenderEvents({
                    url: "https://domain.com/calendar.ics"
                });
                let events = await ke.getEvents({
                    now: moment('20210111').toDate(),
                    pastview: 5,
                    preview: 3,
                    filter: 'Demo.*',
                    filterProperty: 'location',
                    trigger: 'match'

                });
                expect(events).to.have.lengthOf(1)
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });


    it('ical - categories', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let ke = new KalenderEvents({
                    url: "https://domain.com/calendar.ics"
                });
                let events = await ke.getEvents({
                    now: moment('20201205').toDate(),
                    pastview: 1,
                    preview: 2,
                    filter: 'EDUCATION.*',
                    filterProperty: 'categories',
                    trigger: 'match'
                });
                expect(events).to.have.lengthOf(1)
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });
});
