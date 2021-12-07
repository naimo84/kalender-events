
import { expect, use } from "chai";
import moment = require('moment');
import { KalenderEvents } from '../dist/lib';
use(require('chai-like'));
use(require('chai-things'));
describe('events', () => {

    it('ical', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let ke = new KalenderEvents({
                    url: "./test/mocks/testalarms.ics"
                });

                let events = await ke.getEvents({});
                for (const event of events) {
                    expect(event).to.have.property("alarms")
                    expect(event.alarms).to.have.lengthOf(2)
                    expect(moment(event.alarms[0].triggerParsed).diff(moment(event.eventStart))).to.eq(-600000)                                        
                    expect(moment(event.alarms[1].triggerParsed).diff(moment(event.eventStart))).to.eq(-1200000)
                    expect(event.alarms[0].summary).to.be.not.undefined;
                    expect(event.alarms[1].summary).to.be.undefined;
                }
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });

});
