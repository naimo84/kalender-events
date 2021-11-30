/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "cd2fd01dcb324ca9c8a70f5b5b7fe3e9"
  },
  {
    "url": "assets/css/0.styles.73517480.css",
    "revision": "fe2b592ffe98b1cdbbdca213e7bb2544"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.f6d79bc0.js",
    "revision": "1240afd4d1c781c07f75e48b74ab63a4"
  },
  {
    "url": "assets/js/11.0586a2d8.js",
    "revision": "9f7e10ba37dace112b0f808985c3496a"
  },
  {
    "url": "assets/js/12.a8c7a0d9.js",
    "revision": "df9f36c74222939c7e52f34209b46d29"
  },
  {
    "url": "assets/js/13.04f2c9df.js",
    "revision": "e261fa75d2011417c6f36875cd37e6a9"
  },
  {
    "url": "assets/js/3.86be8ce8.js",
    "revision": "6d42c1f2873d7217d9f327a246fd3009"
  },
  {
    "url": "assets/js/4.42dafdfe.js",
    "revision": "d3f0f27a089dcbb4fc2e72b7b1ca7df4"
  },
  {
    "url": "assets/js/5.98d1db9f.js",
    "revision": "cb8a2588e0634b4024778350d6d8dfe7"
  },
  {
    "url": "assets/js/6.c17827bf.js",
    "revision": "77fcdaa570b4727bad96af9a017a16e5"
  },
  {
    "url": "assets/js/7.8b1d8a6a.js",
    "revision": "713ae0cb903360ab7cfd69db80b7a108"
  },
  {
    "url": "assets/js/8.65337fa2.js",
    "revision": "8eb5318d7e6323533da44d4dced9d0ba"
  },
  {
    "url": "assets/js/9.61a4ef6b.js",
    "revision": "a30db5fcc21fea23a20b4aedbabf3857"
  },
  {
    "url": "assets/js/app.21395935.js",
    "revision": "c2052dc64b4c241d7b7e6156619167f3"
  },
  {
    "url": "assets/js/vendors~flowchart.6f010d76.js",
    "revision": "a753e57b5d0d6a2bafe1eb01fc66e9e0"
  },
  {
    "url": "config/index.html",
    "revision": "0a09e768b23b3de3120583520bcc4a00"
  },
  {
    "url": "favicon.png",
    "revision": "d14c965fe422698a3c614b9883b0d687"
  },
  {
    "url": "github.svg",
    "revision": "5a14e36c8b0b5e4ba427f47fca304477"
  },
  {
    "url": "guide/debug.html",
    "revision": "273dc23c5a7ad071f4cdc4c9c4d0e510"
  },
  {
    "url": "guide/index.html",
    "revision": "1121cbf3ee07287b3c1427632620a70a"
  },
  {
    "url": "icons/android-chrome-192x192.png",
    "revision": "2ae129bfbc670ddbc5d83130fdca51fb"
  },
  {
    "url": "icons/android-chrome-512x512.png",
    "revision": "b9a6b0d549941f5938bbbc106f19b0a6"
  },
  {
    "url": "icons/apple-touch-icon-120x120.png",
    "revision": "45a3cf74cc54976ac5eaf03ee8451eac"
  },
  {
    "url": "icons/apple-touch-icon-152x152.png",
    "revision": "c22351d8fe58c26e346cd9d8370e8ff7"
  },
  {
    "url": "icons/apple-touch-icon-180x180.png",
    "revision": "2409468249cc81a1dba5e16b6cb3fee2"
  },
  {
    "url": "icons/apple-touch-icon-60x60.png",
    "revision": "569ba17f0b57bd947718f5e8b8345868"
  },
  {
    "url": "icons/apple-touch-icon-76x76.png",
    "revision": "172d0bea737e2d830879364b85452448"
  },
  {
    "url": "icons/apple-touch-icon.png",
    "revision": "2409468249cc81a1dba5e16b6cb3fee2"
  },
  {
    "url": "icons/favicon-16x16.png",
    "revision": "b0f966ce21204938666d3b76146f3216"
  },
  {
    "url": "icons/favicon-32x32.png",
    "revision": "2956e5675d6247e0e540b1ab30681412"
  },
  {
    "url": "icons/msapplication-icon-144x144.png",
    "revision": "958b57c19149628a3c387108247dc15a"
  },
  {
    "url": "icons/mstile-150x150.png",
    "revision": "6b18d32232681d531a8c949c8e8beb62"
  },
  {
    "url": "index.html",
    "revision": "431c549187fde5a3d732847aeb719f42"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
