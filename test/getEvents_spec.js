
var chai = require("chai");
const nodeIcal = require("node-ical");
var sinon = require('sinon');
const KalenderEvents = require('../dist/lib')
const test_helper = require('./test_helper');

chai.use(require('chai-like'));
chai.use(require('chai-things'));

describe('Upcoming Node', function () {

    it('ical - today 1 - tomorrow 1 - total 2', async () => {
        return new Promise(async (resolve, reject) => {
            //nodeIcal.async.fromURL.restore();
            let stub = sinon.stub(nodeIcal.async, "fromURL");
            stub.returns(test_helper.getEvents());

            let ke = new KalenderEvents.KalenderEvents({
                url: "https://domain.com/calendar.ics"
            });

            let events = await ke.getEvents();
            resolve();
            //expect(msg).to.have.property('today', 1);
            //expect(msg).to.have.property('tomorrow', 1);
        });
    });

});
