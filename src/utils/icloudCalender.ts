import { CliOptions } from "src/cli/cliOptions";

const axios = require('axios')
var convert = require('xml-js');

export async function getCalender(options: CliOptions) {
    try {
        if (options.basicAuth) {
            axios.defaults.headers = {
                Authorization: 'Basic ' + options.basicAuth
            }
        }
        let auth = !options.basicAuth
            ? { auth: { username: options.username, password: options.password } }
            : {}

        let axiosoptions = {
            ...auth,
            method: 'PROPFIND',
            url: "https://caldav.icloud.com/",
            data: `<?xml version="1.0"?>
            <propfind xmlns='DAV:'>
                <prop>
                    <current-user-principal/>
                </prop>
            </propfind>`,

        }
        const response = await axios(axiosoptions);
        var result = JSON.parse(convert.xml2json(response.data, { compact: true, spaces: 4 }));
        let href = result.multistatus.response.propstat.prop['current-user-principal'].href._text

        const response2 = await axios({
            ...auth,
            method: 'PROPFIND',
            url: "https://caldav.icloud.com" + href,
            data: `<?xml version="1.0"?>
        <propfind xmlns='DAV:' xmlns:cd='urn:ietf:params:xml:ns:caldav'><prop><cd:calendar-home-set/></prop></propfind>`,
        });
        var result2 = JSON.parse(convert.xml2json(response2.data, { compact: true, spaces: 4 }));
        let href2 = result2.multistatus.response.propstat.prop['calendar-home-set'].href._text
        let returnObj = {
            href: href2,
            list: [] as any
        }
        const response3 = await axios({
            ...auth,
            method: 'PROPFIND',
            url: href2,
            headers: {
                Depth: 1
            },
            data: `<?xml version="1.0"?>
        <propfind xmlns='DAV:'><prop><displayname/></prop></propfind>
        `,
        });

        let calendars = JSON.parse(convert.xml2json(response3.data, { compact: true, spaces: 4 }));
        let returnList = []
        for (const calendar of calendars.multistatus.response) {
            if (calendar.propstat.prop)
                returnList.push({
                    name: calendar.propstat.prop.displayname._text,
                    href: calendar.href._text
                })
        }
        returnObj.list = returnList;
        return returnObj;
    } catch (err: any) {
        if (err.response)
            console.log(`StatusCode: ${err.response.status}, statusText: ${err.response.statusText}`);
        else
            console.log(err);

        return []
    }
}


