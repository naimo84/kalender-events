
import { expect, use } from "chai";
import moment = require('moment');
import { KalenderEvents } from '../dist/lib';
use(require('chai-like'));
use(require('chai-things'));

describe('events', () => {
   
    it('test #104', async () => {
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

});
