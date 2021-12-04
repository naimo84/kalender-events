
import { expect, should, use } from "chai";
import nodeIcal = require('node-ical');
import Ical = require('../dist/nodeIcal');

var sinon = require('sinon');
import moment = require('moment');
import { KalenderEvents } from '../dist/lib';
import { getEvents } from './test_helper';
use(require('chai-like'));
use(require('chai-things'));

describe('events', () => {
    before(async function () {
        let stub = sinon.stub(Ical, "fromURL");
        let data = await nodeIcal.async.parseFile('./test/mocks/104.ics');
        stub.returns(data);
    });


    after(function () {
        (Ical.fromURL as any).restore();
    });

    it('test #104', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let ke = new KalenderEvents({
                    url: "https://domain.com/calendar.ics"
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
