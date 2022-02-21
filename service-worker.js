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
    "revision": "b026b3a0799f81c373873026db4f6591"
  },
  {
    "url": "assets/css/0.styles.556c3969.css",
    "revision": "040294803be4eccd5ef547c49771981e"
  },
  {
    "url": "assets/img/future_events.667077b5.png",
    "revision": "667077b547f24b16b625f12a9d580595"
  },
  {
    "url": "assets/img/homeoffice.38d0d2b5.png",
    "revision": "38d0d2b57491e3eb856a773cc73b7621"
  },
  {
    "url": "assets/img/nodered-palette-manager.5d6bafe3.png",
    "revision": "5d6bafe3923dedf761e5faab20cc80e0"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.d6495373.js",
    "revision": "01085034806924ff9238cc11c48c0d88"
  },
  {
    "url": "assets/js/11.030930ce.js",
    "revision": "10d6dd5176e54e2be63e1b8dacd1fd47"
  },
  {
    "url": "assets/js/12.c19b8b82.js",
    "revision": "32f6c2176f3a034692359884b33fbeeb"
  },
  {
    "url": "assets/js/13.a1544d2a.js",
    "revision": "7610af0207b7c44b68da8ade8112fdc7"
  },
  {
    "url": "assets/js/14.031bf084.js",
    "revision": "a6605e8d9e454c5a88dae4fe94278b07"
  },
  {
    "url": "assets/js/15.b19ef3f1.js",
    "revision": "77595e3853061dbcf60bc681844d8242"
  },
  {
    "url": "assets/js/16.905f74d9.js",
    "revision": "d780a96172d204c19b953b5b374c0036"
  },
  {
    "url": "assets/js/17.a5de3f1d.js",
    "revision": "a4b60f613f1b18e3dd4f7fb1f9c1892c"
  },
  {
    "url": "assets/js/18.0bda1f73.js",
    "revision": "846faae660d70224f2ecbc771a385df1"
  },
  {
    "url": "assets/js/19.0f11dfbd.js",
    "revision": "96080ba5a3367ca635cc8eccf71d38c9"
  },
  {
    "url": "assets/js/20.b91bdeb8.js",
    "revision": "5c5a034cecc4039d9d5e9b904d5d300d"
  },
  {
    "url": "assets/js/21.6fafc518.js",
    "revision": "917916e5a10b3197ad7a99670f61a059"
  },
  {
    "url": "assets/js/22.bc7df8c7.js",
    "revision": "f5749eebd2d01b56bb02cbbe9391a673"
  },
  {
    "url": "assets/js/23.13bd71b4.js",
    "revision": "bccb6a7be9b59a01ae21d2f79439e686"
  },
  {
    "url": "assets/js/3.ab9172cb.js",
    "revision": "b23c447a0a958874d862ed9eb491840d"
  },
  {
    "url": "assets/js/4.50086b22.js",
    "revision": "0b9c8013f05a387b85c9bfced14f8b38"
  },
  {
    "url": "assets/js/5.0a3e9aa9.js",
    "revision": "7eabf32ca1cf1c3e7d5ebceaa44dcd9f"
  },
  {
    "url": "assets/js/6.8bc27063.js",
    "revision": "51f24a5190e8748cd1ef39c0d834d5e8"
  },
  {
    "url": "assets/js/7.e4e7ea17.js",
    "revision": "09845d18b06c0ad82f3b4b500c50d212"
  },
  {
    "url": "assets/js/8.b4822f51.js",
    "revision": "c9efc9d35c80bb3c0301d67317839068"
  },
  {
    "url": "assets/js/9.31c4fb9e.js",
    "revision": "76d589173ed31e247d28fe79ac24207e"
  },
  {
    "url": "assets/js/app.6f5edb6e.js",
    "revision": "0e042e18537c995056212ef265f01cd8"
  },
  {
    "url": "assets/js/vendors~flowchart.2b4075ff.js",
    "revision": "171e8ec76b9c654e3de78df9133fb3d3"
  },
  {
    "url": "config/google.html",
    "revision": "d4e80359868012e5f1b7063c74b6985e"
  },
  {
    "url": "config/icloudsecure.html",
    "revision": "834f9f711de3443c2074d8c183ebf1c0"
  },
  {
    "url": "config/index.html",
    "revision": "1b60ed83e6e1e066028b2828b3cdacc9"
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
    "revision": "f07c7d9f30184b1af2b434ae8fe8256b"
  },
  {
    "url": "guide/examples_cli.html",
    "revision": "7a48f6aaad46c39b5771dc178d14ce15"
  },
  {
    "url": "guide/examples_lib.html",
    "revision": "e8da212c480270e2b1b55cf3a2f62737"
  },
  {
    "url": "guide/examples.html",
    "revision": "b0de41b6c54a8df20492a9ad0a534530"
  },
  {
    "url": "guide/index.html",
    "revision": "e19a4b4e3952a30fef3fef630c65f498"
  },
  {
    "url": "guide/nodered.html",
    "revision": "9beda2881f9426ac22440ae2dd6ff984"
  },
  {
    "url": "guide/nodes.html",
    "revision": "7a6ab2b8f5bf4fe02cece48b9bb3d68c"
  },
  {
    "url": "guide/sensors.html",
    "revision": "673f1053c09fefb7d6880a7055509db1"
  },
  {
    "url": "guide/trigger.html",
    "revision": "f96ce188bdfcd2699aba24715ddba447"
  },
  {
    "url": "guide/upcoming.html",
    "revision": "39b0b922186dab085271cc07250c5d9d"
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
    "revision": "e407562a9bcef2209a5aa3928f67c4cb"
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
