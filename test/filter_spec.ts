
import { expect, should, use } from "chai";
import moment from 'moment';
import { KalenderEvents } from '../dist/';
use(require('chai-like'));
use(require('chai-things'));

describe('filter', () => {
    

    it('location', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let ke = new KalenderEvents({
                    url: "./test/mocks/events.ics"
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
                    url: "./test/mocks/events.ics"
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
                    url: "./test/mocks/events.ics"
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
                    url: "./test/mocks/events.ics"
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
                    filter: '2021-11-24_11:00:00',
                    filterProperty: 'eventStart',
                    filterOperator: 'before',
                    trigger: 'match'
                });
                let events3 = await ke.getEvents({
                    now: moment('20211121').toDate(),
                    pastview: 1,
                    preview: 3,
                    filter: '2021-11-23_01:00:00',
                    filter2: '2021-11-25_00:00:00',
                    filterProperty: 'eventStart',
                    filterOperator: 'between',
                    trigger: 'match'
                });
              
                for (let event of events2) {
                    expect(event).to.have.property('eventStart');                    
                    expect(event.eventStart).to.be.greaterThan(moment('2021-11-21_00:00:00', "YYYY-MM-DD_hh:mm:ss").toDate());
                }
               
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
