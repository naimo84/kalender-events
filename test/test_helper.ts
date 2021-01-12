const fs = require('fs');

export function getEvents (){
    let rawdata = fs.readFileSync('./test/mocks/testical.json');
    let data = JSON.parse(rawdata);
        return data;
  }