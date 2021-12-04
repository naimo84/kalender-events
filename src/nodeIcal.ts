
const fs = require('fs');
const ical = require('./ical');
const axios = require('axios');

//@ts-ignore
function promiseCallback(fn, cb) {
    const promise = new Promise(fn);
    if (!cb) {
      return promise;
    }
  
    promise
      .then(returnValue => {
        cb(null, returnValue);
      })
      .catch(error => {
        cb(error, null);
      });
  }

export function fromURL(url: any, options: any, cb: any) {
    return promiseCallback((resolve: (arg0: any) => void, reject: (arg0: Error) => void) => {
        axios.get(url, options)
            .then((response: { status: number; statusText: any; data: any; }) => {
                // If (response.status !== 200) {
                // all ok status codes should be accepted (any 2XX code)
                if (Math.floor(response.status / 100) !== 2) {
                    reject(new Error(`${response.status} ${response.statusText}`));
                    return;
                }

                return response.data;
            })
            .then((data: any) => {
                ical.parseICS(data, (error: any, ics: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve(ics);
                });
            })
            .catch((error: any) => {
                reject(error);
            });
    }, cb);
};

export function parseFile(filename: any,cb:any) {
    return promiseCallback((resolve: (arg0: any) => void, reject: (arg0: any) => void) => {
        fs.readFile(filename, 'utf8', (error: any, data: any) => {
            if (error) {
                reject(error);
                return;
            }

            ical.parseICS(data, (error: any, ics: any) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(ics);
            });
        });
    }, cb);
};

export function parseICS(data: any, cb: any) {
    return promiseCallback((resolve: (arg0: any) => void, reject: (arg0: any) => void) => {
        ical.parseICS(data, (error: any, ics: any) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(ics);
        });
    }, cb);
};