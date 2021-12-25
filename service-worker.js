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
    "revision": "a8d9ced84b0a2dd803350d9c86060173"
  },
  {
    "url": "assets/css/0.styles.c95ac92f.css",
    "revision": "3dbc98bbe43919e72c85175c9b1d63b8"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.1a40599e.js",
    "revision": "3bea2a0151634f5ac8cd5791714438ef"
  },
  {
    "url": "assets/js/11.02168131.js",
    "revision": "91aa177363323d0ea73352dee1f1d412"
  },
  {
    "url": "assets/js/12.0d04abfa.js",
    "revision": "170aade7782d97cb4c1843953bccb85c"
  },
  {
    "url": "assets/js/13.965cf1ce.js",
    "revision": "f2553be4d0284785379eab99eda1c829"
  },
  {
    "url": "assets/js/14.481e1109.js",
    "revision": "505a90a55b13362c54808321708ee10f"
  },
  {
    "url": "assets/js/3.5d8eef78.js",
    "revision": "9fc7c74255cc493924a63f69d1a9e2b3"
  },
  {
    "url": "assets/js/4.e8548c46.js",
    "revision": "2ff3d0dc569fd15d2864980deecefd81"
  },
  {
    "url": "assets/js/5.33dac6e7.js",
    "revision": "4020d982a6c4605a128263170c7fd723"
  },
  {
    "url": "assets/js/6.81c05968.js",
    "revision": "39538e2df6bdfbd91cee9751bc71f737"
  },
  {
    "url": "assets/js/7.dd294fc7.js",
    "revision": "d264c527b153c7f2c643dbfa2040b6da"
  },
  {
    "url": "assets/js/8.4d67ef36.js",
    "revision": "5f2e15300cf5ecba03bfdfc76d31b8e0"
  },
  {
    "url": "assets/js/9.38044035.js",
    "revision": "4896eb6cd3a9e20c60081d422097a46b"
  },
  {
    "url": "assets/js/app.2daeefa6.js",
    "revision": "8e6522209bcb61dd3fa375511c79d71f"
  },
  {
    "url": "assets/js/vendors~flowchart.4bff301a.js",
    "revision": "43994a76ab1ae28300d9bee21ed31163"
  },
  {
    "url": "config/index.html",
    "revision": "d1c8a7c718557eba3cbddb51540aaedd"
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
    "revision": "44ee2f5a6bf2485122a84c1e5b4d339b"
  },
  {
    "url": "guide/icloudsecure.html",
    "revision": "d8064fa4c8f5aa06d1d25ff2e1bc2540"
  },
  {
    "url": "guide/index.html",
    "revision": "2fd1b8407392e73a598a4d6516584ff5"
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
    "revision": "a2850c16e45fcb1b1af21bfe35bba172"
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
