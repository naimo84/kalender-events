
import { expect, use } from "chai";
import moment = require('moment');
import { KalenderEvents } from '../dist';
use(require('chai-like'));
use(require('chai-things'));

describe('issues', () => {
   
    it('#131', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!process.env.CALDAV1_URL) resolve();
                let ke = new KalenderEvents({
                    url: "./test/mocks/131.ics"
                });
                let events = await ke.getEvents({
                    now: moment('20220310').toDate(),
                    pastview: 10,
                    preview: 10,
                    includeTodo: true
                });
                expect(events).to.have.lengthOf(20)               
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });


    it('#77', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!process.env.CALDAV1_URL) resolve();
                let ke = new KalenderEvents({
                    url: "./test/mocks/77.ics"
                });
                let events = await ke.getEvents({
                    now: moment('20211013').toDate(),
                    pastview: 1,
                    preview: 1,
                    includeTodo: true
                });
                expect(events).to.have.lengthOf(1)               
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });

    it('#104', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let ke = new KalenderEvents({
                    url: "./test/mocks/104.ics"
                });

                let events = await ke.getEvents({
                    now: moment("20211119").toDate(),
                    pastview:0,
                    preview:1
                });
                expect(events).to.have.lengthOf(1)
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });

    it('#111', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let ke = new KalenderEvents({
                    url: "./test/mocks/111.ics"
                });

                let events = await ke.getEvents({
                    now: moment("20210524").toDate(),
                    pastview:1,
                    preview:1
                });
                expect(events).to.have.lengthOf(1)
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });

});
