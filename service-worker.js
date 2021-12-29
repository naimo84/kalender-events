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
    "revision": "912e2b880e4f8eeda3574afaf52bbdda"
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
    "url": "assets/js/10.63bacc3f.js",
    "revision": "26b4f4677bed02a745dea7bb90b4970c"
  },
  {
    "url": "assets/js/11.165d9a21.js",
    "revision": "77863408669e830f3773b3703bd32ce3"
  },
  {
    "url": "assets/js/12.a308362b.js",
    "revision": "beccfd49568001800aae76ce896ce27d"
  },
  {
    "url": "assets/js/13.b54c1e4e.js",
    "revision": "c429f0b9c2b0dfdec345376fc6a7cd4d"
  },
  {
    "url": "assets/js/14.d8044446.js",
    "revision": "f7f0362b1efe0957cc44d1a5829fd42e"
  },
  {
    "url": "assets/js/15.6aecef19.js",
    "revision": "a25227ac00a0367e92e4caa0b2bf089d"
  },
  {
    "url": "assets/js/16.9d76b840.js",
    "revision": "a3df3c9d06190a8f2de93c4b98bb4ee2"
  },
  {
    "url": "assets/js/17.d6f6ff8c.js",
    "revision": "3ee70239a72105a19cb7c5637226827f"
  },
  {
    "url": "assets/js/18.19e3f66e.js",
    "revision": "97dbee02ca1f387eb18ca6ec78f5af41"
  },
  {
    "url": "assets/js/19.99a97c04.js",
    "revision": "f1cb097398b935552a5bde5ac9c638b8"
  },
  {
    "url": "assets/js/3.34aa6079.js",
    "revision": "da20c3b610fbbabd4b752702d9b01403"
  },
  {
    "url": "assets/js/4.1761f527.js",
    "revision": "40f24a8fa2de918ba4c76d0554162e47"
  },
  {
    "url": "assets/js/5.b6233efe.js",
    "revision": "a7def263d0e93a366234077b6f8a62f4"
  },
  {
    "url": "assets/js/6.81c05968.js",
    "revision": "39538e2df6bdfbd91cee9751bc71f737"
  },
  {
    "url": "assets/js/7.8f74bc03.js",
    "revision": "d926ba304d5a4d3b1b9a6607e4e61fe2"
  },
  {
    "url": "assets/js/8.4d67ef36.js",
    "revision": "5f2e15300cf5ecba03bfdfc76d31b8e0"
  },
  {
    "url": "assets/js/9.aa56c17d.js",
    "revision": "253e60984da98fb551670be349471793"
  },
  {
    "url": "assets/js/app.3fe199ea.js",
    "revision": "60f90becab8e2b14f4fd23edbbe91891"
  },
  {
    "url": "assets/js/vendors~flowchart.4bff301a.js",
    "revision": "43994a76ab1ae28300d9bee21ed31163"
  },
  {
    "url": "config/google.html",
    "revision": "aa507974a286b3b4009c8ad87ab14425"
  },
  {
    "url": "config/icloudsecure.html",
    "revision": "8a3be7c6d0ccfeada463c00fd4ff09a0"
  },
  {
    "url": "config/index.html",
    "revision": "bec3f22a1fa0c1255558390b6e2e9acc"
  },
  {
    "url": "examples/index.html",
    "revision": "37c7125c44da0ce352aa0da43af62957"
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
    "revision": "9df68ba154ff99e60333dd858d2b0c4c"
  },
  {
    "url": "guide/examples_cli.html",
    "revision": "9a4ec257cdc91715a210d51eeefd18e0"
  },
  {
    "url": "guide/examples_lib.html",
    "revision": "0f053afce05b20f9e1f775797ff239f4"
  },
  {
    "url": "guide/examples.html",
    "revision": "f87cabe39c40f25214c470b6cfac578b"
  },
  {
    "url": "guide/index.html",
    "revision": "5ededa836387cb21fcb2ffd893e55565"
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
    "revision": "f9e22652b5675f8a1a55fcdc6cba4a3b"
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
