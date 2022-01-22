
import { expect, should, use } from "chai";
import moment = require('moment');
import { KalenderEvents } from '../dist/';
import Ical = require('../dist/');

var sinon = require('sinon');
use(require('chai-like'));
use(require('chai-things'));

describe('events', () => {
    it('no default override', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let ke = new KalenderEvents({
                    url: "./test/mocks/events.ics"
                });
                let events = await ke.getEvents({
                    now: moment('20111123').toDate(),
                });
                expect(events).to.have.lengthOf(0)
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });

    it('exdate', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let ke = new KalenderEvents({
                    url: "./test/mocks/events.ics"
                });
                let events = await ke.getEvents({
                    now: moment('20111123').toDate(),
                    pastview: 1,
                    preview: 2
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
                    url: "./test/mocks/events.ics"
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

    it('hours preview', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let ke = new KalenderEvents({
                    url: "./test/mocks/events.ics"
                });
                let events = await ke.getEvents({
                    now: moment('20210325').toDate(),
                    pastview: 1 * 24,
                    pastviewUnits: 'hours',
                    preview: 14 * 24,
                    previewUnits: 'hours',
                });
                expect(events).to.have.lengthOf(2)
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });

    it('countdown', async () => {
        return new Promise(async (resolve, reject) => {
            let ke = new KalenderEvents({
                url: "./test/mocks/events.ics"
            });
            try {
                await ke.getEvents({ pastview: 'wrongFormat' })
                reject('should not be there');
            } catch (err) {

                expect(err).to.be.instanceof(Error);
                resolve();
            }
        });
    });

    it('Duration parse Error', async () => {
        return new Promise(async (resolve, reject) => {
            let ke = new KalenderEvents({
                url: "./test/mocks/events.ics"
            });
            try {
                const countdown = ke.countdown(new Date(new Date().getTime() + (1 * 60 * 60 * 1000)));
                expect(countdown.hours).to.be.equal(1);
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });


    it('caching', async () => {
        return new Promise(async (resolve, reject) => {
            let ke = new KalenderEvents({
                url: "./test/mocks/events.ics"
            });
            try {
                await ke.getEvents({
                    now: moment('20210325').toDate(),
                    pastview: 1,
                    preview: 14,
                    usecache: true
                })

                let events = await ke.getEvents({
                    pastview: 'wrongFormat',
                    now: moment('20210325').toDate(),
                    preview: 14,
                    usecache: true
                })

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
                    url: "./test/mocks/events.ics"
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

    afterEach(function () {
        sinon.restore();
    });

    // it('webcal', async () => {


    //         let stub = sinon.stub(Ical, "fromURL");
    //         let data = await Ical.parseFile('./test/mocks/events.ics');
    //         stub.returns(data);


    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             let ke = new KalenderEvents({
    //                 url: "webcal://domain.com/calendar.ics"
    //             });
    //             let events = await ke.getEvents({
    //                 now: moment('20200616').toDate(),
    //                 pastview: 1,
    //                 preview: 1
    //             });
    //             expect(events).to.have.lengthOf(1)
    //             resolve();
    //         } catch (err) {
    //             reject(err);
    //         }
    //     });
    // });

    it('file', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let ke = new KalenderEvents({
                    url: "./test/mocks/events.ics"
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

    it('ical - iso 8601 duration', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let ke = new KalenderEvents({
                    url: "./test/mocks/events.ics"
                });
                let events = await ke.getEvents({
                    now: moment('20200616').toDate(),
                    pastview: "P1D",
                    preview: "P1D"
                });
                expect(events).to.have.lengthOf(1)
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });

    it('ical - iso 8601 wrong duration', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let ke = new KalenderEvents({
                    url: "./test/mocks/ev2.ics",
                });
                let events = await ke.getEvents({
                    now: moment('20200616').toDate(),
                    pastview: "1D",
                    preview: "1D"
                });
                reject(new Error("should not be here"));
            } catch (err) {
                expect(err.message).to.be.a('string', 'preview must be a duration string or a number');
                resolve(err);
            }
        });
    });

    it('ical - weekly', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let ke = new KalenderEvents({
                    url: "./test/mocks/events.ics"
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
});


