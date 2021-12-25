(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{431:function(a,e,t){"use strict";t.r(e);var s=t(20),r=Object(s.a)({},(function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"icloud-secure"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#icloud-secure"}},[a._v("#")]),a._v(" iCloud secure")]),a._v(" "),t("p",[a._v("For getting the iCloud secure URL you have to use cURL.")]),a._v(" "),t("p",[a._v('Log into your Apple account at appleid.apple.com. Maybe you have to confirm your login by entering the two-factor identification code.\nAs you\'re logged in, have a look for "Security" in the Apple ID control panel and click on "Generate Password".')]),a._v(" "),t("p",[a._v('Label the app-specific password whatever you want, e.g. "kalender-events" and click "Create".')]),a._v(" "),t("p",[t("img",{attrs:{src:"https://github.com/naimo84/kalender-events/raw/docs/examples/generate_password.png",alt:"generate_password"}})]),a._v(" "),t("p",[a._v("Apple will provide you with a randomly generated alphanumeric string in the format xxxx-xxxx-xxxx-xxxx. Highlight and copy the password and keep it somewhere safe.")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://github.com/naimo84/kalender-events/raw/docs/examples/generate_password_2.png",alt:"generate_password"}})]),a._v(" "),t("p",[a._v("Next open a console that can run cURL")]),a._v(" "),t("p",[a._v("run this (replacing $APPLEID with your own Apple ID):")]),a._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[a._v("$ "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" -s -X PROPFIND -u "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"'),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$APPLEID")]),a._v('"')]),a._v(" -H "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Depth: 0"')]),a._v("  --data "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("\"<propfind xmlns='DAV:'><prop><current-user-principal/></prop></propfind>\"")]),a._v("  https://caldav.icloud.com/\n")])])]),t("p",[a._v("When propmted for credentials, enter in the app-specific password")]),a._v(" "),t("p",[a._v("You should get a response and it shows you the URL of your account record.\nSomething like "),t("a",{attrs:{href:"https://caldav.icloud.com/347723822/principal/",target:"_blank",rel:"noopener noreferrer"}},[a._v("https://caldav.icloud.com/347723822/principal/"),t("OutboundLink")],1)]),a._v(" "),t("p",[a._v("Next run this (replacing your numeric ID)")]),a._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[a._v("$ "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" -s -X PROPFIND -u "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"'),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$APPLEID")]),a._v('"')]),a._v(" -H "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Depth: 0"')]),a._v("  --data "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("\"<propfind xmlns='DAV:' xmlns:cd='urn:ietf:params:xml:ns:caldav'><prop><cd:calendar-home-set/></prop></propfind>\"")]),a._v(" https://caldav.icloud.com/347723822/principal/\n")])])]),t("p",[a._v("This gives you the reference to the cluster the actual calendars lives on.\nSomething like "),t("a",{attrs:{href:"https://p22-caldav.icloud.com:443/347723822/calendars",target:"_blank",rel:"noopener noreferrer"}},[a._v("https://p22-caldav.icloud.com:443/347723822/calendars"),t("OutboundLink")],1)]),a._v(" "),t("p",[a._v("You can list all the calendars from your icloud account by running (replacing with your output from above):")]),a._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" -s -X PROPFIND -u "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"'),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$APPLEID")]),a._v('"')]),a._v(" -H "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Depth: 1"')]),a._v("  --data "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("\"<propfind xmlns='DAV:'><prop><displayname/></prop></propfind>\"")]),a._v("  https://p42-caldav.icloud.com:443/347723822/calendars/ "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("grep")]),a._v(" displayname\n")])])]),t("p",[a._v("then strip off the grep to show all info about each calendar:")]),a._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" -s -X PROPFIND -u "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"'),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$APPLEID")]),a._v('"')]),a._v(" -H "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Depth: 1"')]),a._v("  --data "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("\"<propfind xmlns='DAV:'><prop><displayname/></prop></propfind>\"")]),a._v("  https://p42-caldav.icloud.com:443/347723822/calendars/\n")])])]),t("p",[a._v("You may need to up your history buffer depending on the number of calendars you have.")]),a._v(" "),t("p",[a._v("You are looking for the href value if the calendar you are after eg")]),a._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("href"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("/1317873642/calendars/086e6106-1c0d-4301-a99d-5c5ebbcc5079/"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("/href"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\n")])])]),t("p",[a._v("Once you have this, put it together:")]),a._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[a._v("https://p42-caldav.icloud.com:443/347723822/calendars/086e6106-1c0d-4301-a99d-5c5ebbcc5079/\n")])])]),t("p",[a._v("That's your calDAV URL 😁")]),a._v(" "),t("p",[a._v("Thanks to Andrew_Pawelski from the openHab Forum "),t("a",{attrs:{href:"https://community.openhab.org/t/solved-apple-icloud-caldav-connection/32510/6",target:"_blank",rel:"noopener noreferrer"}},[a._v("https://community.openhab.org/t/solved-apple-icloud-caldav-connection/32510/6"),t("OutboundLink")],1),a._v(", who wrote this tutorial.")])])}),[],!1,null,null,null);e.default=r.exports}}]);