---
sidebarDepth: 0
---

# iCloud secure

For getting the iCloud secure URL you have two options: manually using cURL or automatically via kalender-events.

For both options you have to do the following:

## Generate an app-specific password

Log into your Apple account at appleid.apple.com. Maybe you have to confirm your login by entering the two-factor identification code.
As you're logged in, have a look for "Security" in the Apple ID control panel and click on "Generate Password".

Label the app-specific password whatever you want, e.g. "kalender-events" and click "Create".

![generate_password](https://github.com/naimo84/kalender-events/raw/docs/docs/examples/generate_password.png)

Apple will provide you with a randomly generated alphanumeric string in the format xxxx-xxxx-xxxx-xxxx. Highlight and copy the password and keep it somewhere safe.

![generate_password](https://github.com/naimo84/kalender-events/raw/docs/docs/examples/generate_password_2.png)  

## use kalender-events

Next open a console.
run this (replacing me@icloud.com with your own Apple ID and xxxx-xxxx-xxxx-xxxx with the app-specific password):

```sh
npx kalender-events icloudurl --username me@icloud.com --password xxxx-xxxx-xxxx-xxxx 
```

the output will look like: 

```json
{
  href: 'https://p51-caldav.icloud.com:443/123456789/calendars/',
  list: [
    { 
      name: 'Benjamin', 
      href: '/123456789/calendars/' },
    {
      name: 'Kalender',
      href: '/123456789/calendars/005CEAF5-72EF-4D3B-B6F4-CB2575EC765C/'
    },
    {
      name: 'Familie',
      href: '/123456789/calendars/bef56e45-9bd0-4c66-8c61-faf5d00f2167/'
    },
    {
      name: 'Familie',
      href: '/123456789/calendars/e0b1aa5c-ff01-4c27-9706-e8f1e397dd11/'
    },
    { name: 'Privat', href: '/123456789/calendars/home/' },
    { name: 'Erinnerungen', href: '/123456789/calendars/tasks/' },
    { name: 'Arbeit', href: '/123456789/calendars/work/' }
  ]
}
```

## manual using cURL
  
Next open a console that can run cURL

run this (replacing me@icloud.com with your own Apple ID):

```sh
$ curl -s -X PROPFIND -u "me@icloud.com" -H "Depth: 0"  --data "<propfind xmlns='DAV:'><prop><current-user-principal/></prop></propfind>"  https://caldav.icloud.com/
```

When propmted for credentials, enter in the app-specific password

You should get a response and it shows you the URL of your account record.
Something like <https://caldav.icloud.com/347723822/principal/>

Next run this (replacing your numeric ID)

```sh
$ curl -s -X PROPFIND -u "$APPLEID" -H "Depth: 0"  --data "<propfind xmlns='DAV:' xmlns:cd='urn:ietf:params:xml:ns:caldav'><prop><cd:calendar-home-set/></prop></propfind>" https://caldav.icloud.com/347723822/principal/
```

This gives you the reference to the cluster the actual calendars lives on.
Something like <https://p22-caldav.icloud.com:443/347723822/calendars>

You can list all the calendars from your icloud account by running (replacing with your output from above):

```sh
curl -s -X PROPFIND -u "$APPLEID" -H "Depth: 1"  --data "<propfind xmlns='DAV:'><prop><displayname/></prop></propfind>"  https://p42-caldav.icloud.com:443/347723822/calendars/ | grep displayname
```

then strip off the grep to show all info about each calendar:

```sh
curl -s -X PROPFIND -u "$APPLEID" -H "Depth: 1"  --data "<propfind xmlns='DAV:'><prop><displayname/></prop></propfind>"  https://p42-caldav.icloud.com:443/347723822/calendars/
```

You may need to up your history buffer depending on the number of calendars you have.

You are looking for the href value if the calendar you are after eg

```sh
<href>/1317873642/calendars/086e6106-1c0d-4301-a99d-5c5ebbcc5079/</href>
```

Once you have this, put it together:

```sh
https://p42-caldav.icloud.com:443/347723822/calendars/086e6106-1c0d-4301-a99d-5c5ebbcc5079/
```

That's your calDAV URL :grin:

Thanks to Andrew_Pawelski from the openHab Forum <https://community.openhab.org/t/solved-apple-icloud-caldav-connection/32510/6>, who wrote this tutorial.
