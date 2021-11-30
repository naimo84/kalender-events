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
    "revision": "fe15cb3053f7dcf3af9f4e6c91f55d41"
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
    "url": "assets/js/11.ef024d31.js",
    "revision": "b6e2fd3a38b392a5ae020833b2a7f22b"
  },
  {
    "url": "assets/js/12.be977d70.js",
    "revision": "88d645285d7c6ee8f24f1a81b3bb50a0"
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
    "url": "assets/js/app.ea7b87f8.js",
    "revision": "1ae21ba01eaeafb74edea550f231a124"
  },
  {
    "url": "assets/js/vendors~flowchart.6f010d76.js",
    "revision": "a753e57b5d0d6a2bafe1eb01fc66e9e0"
  },
  {
    "url": "config/index.html",
    "revision": "ad1148b6d8d5c9b73353850a91ab7664"
  },
  {
    "url": "favicon.png",
    "revision": "3bafa54ce075d3f5efd9bad5ed734fdb"
  },
  {
    "url": "github.svg",
    "revision": "5a14e36c8b0b5e4ba427f47fca304477"
  },
  {
    "url": "guide/debug.html",
    "revision": "7b2ded8d2cd94a93d59678bbe8c27090"
  },
  {
    "url": "guide/index.html",
    "revision": "7eeedf0042ffc3f5ec9e8634003e13c9"
  },
  {
    "url": "icons/android-chrome-192x192.png",
    "revision": "d11db6a43debb45ba0d20e8c8f3a284f"
  },
  {
    "url": "icons/android-chrome-512x512.png",
    "revision": "071599deccb807ff8f9d38deaaadc36e"
  },
  {
    "url": "icons/android-chrome-maskable-192x192.png",
    "revision": "d11db6a43debb45ba0d20e8c8f3a284f"
  },
  {
    "url": "icons/android-chrome-maskable-512x512.png",
    "revision": "071599deccb807ff8f9d38deaaadc36e"
  },
  {
    "url": "icons/apple-touch-icon-120x120.png",
    "revision": "44ceae857825d1f345891eab3cbaf83e"
  },
  {
    "url": "icons/apple-touch-icon-152x152.png",
    "revision": "b367b1caa953e3a6ff06d3c018a3f6b3"
  },
  {
    "url": "icons/apple-touch-icon-180x180.png",
    "revision": "7444d6986e036c065287a839928d05f3"
  },
  {
    "url": "icons/apple-touch-icon-60x60.png",
    "revision": "938b7681af2299b0ac47af9b7f2759db"
  },
  {
    "url": "icons/apple-touch-icon-76x76.png",
    "revision": "92ded4dd7ddc347f05535ddeea343220"
  },
  {
    "url": "icons/apple-touch-icon.png",
    "revision": "7444d6986e036c065287a839928d05f3"
  },
  {
    "url": "icons/favicon-16x16.png",
    "revision": "cf4b7492f6e85fd8de4c76de2971ef8c"
  },
  {
    "url": "icons/favicon-32x32.png",
    "revision": "bb9c62ab93da02a9488963b2d7dc0f0b"
  },
  {
    "url": "icons/msapplication-icon-144x144.png",
    "revision": "bf6d6fd10a317810158361ecfd363f2c"
  },
  {
    "url": "icons/mstile-150x150.png",
    "revision": "866e357ba94d906be308e45d05b5e99e"
  },
  {
    "url": "icons/safari-pinned-tab.svg",
    "revision": "2fca233f65923be1c98ddf04f2cc3241"
  },
  {
    "url": "index.html",
    "revision": "49383dcc339fbe48f21665158f84f34a"
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
