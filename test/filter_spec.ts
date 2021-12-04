
import { expect, should, use } from "chai";
import nodeIcal = require('node-ical');

var sinon = require('sinon');
import moment = require('moment');
import { KalenderEvents } from '../dist/lib';
import { getEvents } from './test_helper';
use(require('chai-like'));
use(require('chai-things'));

describe('filter', () => {
    before(async function () {
        let stub = sinon.stub(nodeIcal.async, "fromURL");
        let data = await nodeIcal.async.parseFile('./test/mocks/events.ics');
        stub.returns(data);
    });


    after(function () {
        nodeIcal.async.fromURL.restore();
    });

    it('location', async () => {
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

    it('attendee', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let ke = new KalenderEvents({
                    url: "https://domain.com/calendar.ics"
                });
                let events = await ke.getEvents({
                    now: moment('20210111').toDate(),
                    pastview: 5,
                    preview: 3,
                    filter: 'demo.*',
                    filterProperty: 'attendee',
                    trigger: 'match'

                });
                expect(events).to.have.lengthOf(1)
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });


    it('categories', async () => {
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

    it('eventStart before after between', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let ke = new KalenderEvents({
                    url: "https://domain.com/calendar.ics"
                });
                let events1 = await ke.getEvents({
                    now: moment('20211121').toDate(),
                    pastview: 1,
                    preview: 3,
                    filter: '2021-11-21_00:00:00',
                    filterProperty: 'eventStart',
                    filterOperator: 'after',
                    trigger: 'match'
                });
                let events2 = await ke.getEvents({
                    now: moment('20211121').toDate(),
                    pastview: 1,
                    preview: 3,
                    filter: '2021-11-24_13:00:00',
                    filterProperty: 'eventStart',
                    filterOperator: 'before',
                    trigger: 'match'
                });
                let events3 = await ke.getEvents({
                    now: moment('20211121').toDate(),
                    pastview: 1,
                    preview: 3,
                    filter: '2021-11-23_00:00:00',
                    filter2: '2021-11-25_00:00:00',
                    filterProperty: 'eventStart',
                    filterOperator: 'between',
                    trigger: 'match'
                });
                expect(events1).to.have.lengthOf(2)
                expect(events2).to.have.lengthOf(1)
                expect(events3).to.have.lengthOf(1)

                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });
});
