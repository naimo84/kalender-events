(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{432:function(a,t,s){"use strict";s.r(t);var e=s(20),n=Object(e.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"icloud-secure"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#icloud-secure"}},[a._v("#")]),a._v(" iCloud secure")]),a._v(" "),s("p",[a._v("For getting the iCloud secure URL you have two options: manually using cURL or automatically via kalender-events.")]),a._v(" "),s("p",[a._v("For both options you have to do the following:")]),a._v(" "),s("h2",{attrs:{id:"generate-an-app-specific-password"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#generate-an-app-specific-password"}},[a._v("#")]),a._v(" Generate an app-specific password")]),a._v(" "),s("p",[a._v('Log into your Apple account at appleid.apple.com. Maybe you have to confirm your login by entering the two-factor identification code.\nAs you\'re logged in, have a look for "Security" in the Apple ID control panel and click on "Generate Password".')]),a._v(" "),s("p",[a._v('Label the app-specific password whatever you want, e.g. "kalender-events" and click "Create".')]),a._v(" "),s("p",[s("img",{attrs:{src:"https://github.com/naimo84/kalender-events/raw/docs/docs/examples/generate_password.png",alt:"generate_password"}})]),a._v(" "),s("p",[a._v("Apple will provide you with a randomly generated alphanumeric string in the format xxxx-xxxx-xxxx-xxxx. Highlight and copy the password and keep it somewhere safe.")]),a._v(" "),s("p",[s("img",{attrs:{src:"https://github.com/naimo84/kalender-events/raw/docs/docs/examples/generate_password_2.png",alt:"generate_password"}})]),a._v(" "),s("h2",{attrs:{id:"use-kalender-events"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#use-kalender-events"}},[a._v("#")]),a._v(" use kalender-events")]),a._v(" "),s("p",[a._v("Next open a console.\nrun this (replacing me@icloud.com with your own Apple ID and xxxx-xxxx-xxxx-xxxx with the app-specific password):")]),a._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[a._v("npx kalender-events icloudurl --username me@icloud.com --password xxxx-xxxx-xxxx-xxxx \n")])])]),s("p",[a._v("the output will look like:")]),a._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  href"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" 'https"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//p51-caldav.icloud.com:443/123456789/calendars/',")]),a._v("\n  list"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v(" \n      name"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" 'Benjamin'"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" \n      href"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" '/"),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("123456789")]),a._v("/calendars/' "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n      name"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" 'Kalender'"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n      href"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" '/"),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("123456789")]),a._v("/calendars/005CEAF5-72EF-4D3B-B6F4-CB2575EC765C/'\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n      name"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" 'Familie'"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n      href"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" '/"),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("123456789")]),a._v("/calendars/bef56e45-9bd0-4c66-8c61-faf5d00f2167/'\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n      name"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" 'Familie'"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n      href"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" '/"),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("123456789")]),a._v("/calendars/e0b1aa5c-ff01-4c27"),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("-9706")]),a._v("-e8f1e397dd11/'\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v(" name"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" 'Privat'"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" href"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" '/"),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("123456789")]),a._v("/calendars/home/' "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v(" name"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" 'Erinnerungen'"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" href"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" '/"),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("123456789")]),a._v("/calendars/tasks/' "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v(" name"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" 'Arbeit'"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" href"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" '/"),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("123456789")]),a._v("/calendars/work/' "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),s("h2",{attrs:{id:"manual-using-curl"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#manual-using-curl"}},[a._v("#")]),a._v(" manual using cURL")]),a._v(" "),s("p",[a._v("Next open a console that can run cURL")]),a._v(" "),s("p",[a._v("run this (replacing me@icloud.com with your own Apple ID):")]),a._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" -s -X PROPFIND -u "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"me@icloud.com"')]),a._v(" -H "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Depth: 0"')]),a._v("  --data "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("\"<propfind xmlns='DAV:'><prop><current-user-principal/></prop></propfind>\"")]),a._v("  https://caldav.icloud.com/\n")])])]),s("p",[a._v("When propmted for credentials, enter in the app-specific password")]),a._v(" "),s("p",[a._v("You should get a response and it shows you the URL of your account record.\nSomething like "),s("a",{attrs:{href:"https://caldav.icloud.com/347723822/principal/",target:"_blank",rel:"noopener noreferrer"}},[a._v("https://caldav.icloud.com/347723822/principal/"),s("OutboundLink")],1)]),a._v(" "),s("p",[a._v("Next run this (replacing your numeric ID)")]),a._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" -s -X PROPFIND -u "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"'),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$APPLEID")]),a._v('"')]),a._v(" -H "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Depth: 0"')]),a._v("  --data "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("\"<propfind xmlns='DAV:' xmlns:cd='urn:ietf:params:xml:ns:caldav'><prop><cd:calendar-home-set/></prop></propfind>\"")]),a._v(" https://caldav.icloud.com/347723822/principal/\n")])])]),s("p",[a._v("This gives you the reference to the cluster the actual calendars lives on.\nSomething like "),s("a",{attrs:{href:"https://p22-caldav.icloud.com:443/347723822/calendars",target:"_blank",rel:"noopener noreferrer"}},[a._v("https://p22-caldav.icloud.com:443/347723822/calendars"),s("OutboundLink")],1)]),a._v(" "),s("p",[a._v("You can list all the calendars from your icloud account by running (replacing with your output from above):")]),a._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" -s -X PROPFIND -u "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"'),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$APPLEID")]),a._v('"')]),a._v(" -H "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Depth: 1"')]),a._v("  --data "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("\"<propfind xmlns='DAV:'><prop><displayname/></prop></propfind>\"")]),a._v("  https://p42-caldav.icloud.com:443/347723822/calendars/ "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("grep")]),a._v(" displayname\n")])])]),s("p",[a._v("then strip off the grep to show all info about each calendar:")]),a._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" -s -X PROPFIND -u "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"'),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$APPLEID")]),a._v('"')]),a._v(" -H "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Depth: 1"')]),a._v("  --data "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("\"<propfind xmlns='DAV:'><prop><displayname/></prop></propfind>\"")]),a._v("  https://p42-caldav.icloud.com:443/347723822/calendars/\n")])])]),s("p",[a._v("You may need to up your history buffer depending on the number of calendars you have.")]),a._v(" "),s("p",[a._v("You are looking for the href value if the calendar you are after eg")]),a._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("href"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("/1317873642/calendars/086e6106-1c0d-4301-a99d-5c5ebbcc5079/"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("/href"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\n")])])]),s("p",[a._v("Once you have this, put it together:")]),a._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[a._v("https://p42-caldav.icloud.com:443/347723822/calendars/086e6106-1c0d-4301-a99d-5c5ebbcc5079/\n")])])]),s("p",[a._v("That's your calDAV URL 😁")]),a._v(" "),s("p",[a._v("Thanks to Andrew_Pawelski from the openHab Forum "),s("a",{attrs:{href:"https://community.openhab.org/t/solved-apple-icloud-caldav-connection/32510/6",target:"_blank",rel:"noopener noreferrer"}},[a._v("https://community.openhab.org/t/solved-apple-icloud-caldav-connection/32510/6"),s("OutboundLink")],1),a._v(", who wrote this tutorial.")])])}),[],!1,null,null,null);t.default=n.exports}}]);