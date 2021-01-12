
import {expect,should,use} from "chai";
const nodeIcal =require("node-ical");
var sinon = require('sinon');
import moment = require('moment');
import {KalenderEvents} from '../dist/lib';
import {getEvents} from './test_helper';
use(require('chai-like'));
use(require('chai-things'));

describe('events',  ()=> {

    it('ical - today 1 - tomorrow 1 - total 2', async () => {
        return new Promise(async (resolve, reject) => {
            //nodeIcal.async.fromURL.restore();
            let stub = sinon.stub(nodeIcal.async, "fromURL");
            let eventstub= getEvents();
            
            eventstub["1"].start = moment().subtract(1, 'hour').toDate();
            eventstub["1"].end = moment().add(1, 'hour').toDate();
            eventstub["2"].start = moment().add(1, 'day').toDate();
            eventstub["2"].end = moment().add(1, 'day').toDate();
            stub.returns(eventstub);

            let ke = new KalenderEvents({
                url: "https://domain.com/calendar.ics"               
            });

            let events = await ke.getEvents();
            expect(events).to.have.lengthOf(2)
            
            resolve();
        });
    });

});
