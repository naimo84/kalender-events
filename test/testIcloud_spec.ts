
import { expect, use } from "chai";
import moment = require('moment');
import { KalenderEvents } from '../dist/lib';
use(require('chai-like'));
use(require('chai-things'));

describe('icloud', () => {

    it('preview = pastview = 1', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!process.env.ICLOUD_URL) resolve();
                let ke = new KalenderEvents({
                    url: process.env.ICLOUD_URL,
                    username: process.env.ICLOUD_USERNAME,
                    password: process.env.ICLOUD_PASSWORD,
                    type: 'icloud'
                });
                let events = await ke.getEvents({
                    now: moment('20210101').toDate(),
                    pastview: 1,
                    preview: 1
                });
                expect(events).to.have.lengthOf(1)
                expect(events[0].summary).to.equal('kalender-events');
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });

    it('preview 7, pastview 0', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!process.env.ICLOUD_URL) resolve();
                let ke = new KalenderEvents({
                    url: process.env.ICLOUD_URL,
                    username: process.env.ICLOUD_USERNAME,
                    password: process.env.ICLOUD_PASSWORD,
                    type: 'icloud'
                });
                let events = await ke.getEvents({
                    now: moment('20210201').toDate(),
                    pastview: 0,
                    preview: 7
                });
                expect(events).to.have.lengthOf(7)
                expect(events[0].summary).to.equal('kalender-events');
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });

    it('error', async () => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!process.env.ICLOUD_URL) resolve();
                let ke = new KalenderEvents({
                    url: process.env.ICLOUD_URL+'error',                    
                    type: 'icloud'
                });
                let events = await ke.getEvents({
                    now: moment('20210201').toDate(),
                    pastview: 0,
                    preview: 7
                });
               reject('should not be here');
            } catch (err) {
                expect(err).to.be.an('error');
                resolve();
            }
        });
    });
});

