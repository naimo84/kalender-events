
import { expect, use } from "chai";
import moment = require('moment');
import { KalenderEvents } from '../dist';
use(require('chai-like'));
use(require('chai-things'));

describe('outlook', () => {

    it('', async () => {
        return new Promise(async (resolve, reject) => {
            try {
           
                let ke = new KalenderEvents({
                    url: './test/mocks/outlook.ics'
                });
                let events = await ke.getEvents({
                    now: moment('20211201').toDate(),
                    pastview: 1,
                    preview: 1
                });
                expect(events).to.have.lengthOf(1)    
                expect(events[0].summary).to.equal('Daily');         
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });

});

