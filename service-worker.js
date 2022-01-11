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
    "revision": "c224d6b95e17fa2672aa9bd4294aea6a"
  },
  {
    "url": "assets/css/0.styles.c95ac92f.css",
    "revision": "3dbc98bbe43919e72c85175c9b1d63b8"
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
    "url": "assets/js/10.2fddbf1f.js",
    "revision": "1c420b2598c97762200a20ca235dd075"
  },
  {
    "url": "assets/js/11.27a88813.js",
    "revision": "c4fd6e789db8174d8eac7b0aa834a0d7"
  },
  {
    "url": "assets/js/12.b641080b.js",
    "revision": "8db59a4d68b808943091da3fa53cb728"
  },
  {
    "url": "assets/js/13.3478462a.js",
    "revision": "8317fca91ab6c8b7cc63ec76b59f8faf"
  },
  {
    "url": "assets/js/14.982e2259.js",
    "revision": "fbeb24a368eca47321b30d55f5712963"
  },
  {
    "url": "assets/js/15.9026910e.js",
    "revision": "505a7bf8c0376a051a1099160230b885"
  },
  {
    "url": "assets/js/16.d58bdb64.js",
    "revision": "d79c316b5f95da8dfa0558024c26849b"
  },
  {
    "url": "assets/js/17.bb5faf92.js",
    "revision": "1431ff6a1200cd36c1213e4c8eef70b0"
  },
  {
    "url": "assets/js/18.3c9b8d0d.js",
    "revision": "c0f7ae1deef4f75d1ec47275dd04624b"
  },
  {
    "url": "assets/js/19.b891306c.js",
    "revision": "b46155010de6afae82ba830160211917"
  },
  {
    "url": "assets/js/20.499aa70c.js",
    "revision": "4234500a0ed28a321d7f9b449447d1d6"
  },
  {
    "url": "assets/js/21.2e0fb602.js",
    "revision": "0b22b9e42e1aec26e1455cc7dd6d87e5"
  },
  {
    "url": "assets/js/22.beacdbe7.js",
    "revision": "dc0613794886d0ae59bf3c2b5887d7bb"
  },
  {
    "url": "assets/js/23.a8567fe9.js",
    "revision": "3025194fdc35cf309a55263b86e6a20f"
  },
  {
    "url": "assets/js/3.ac4766c4.js",
    "revision": "7ca7aaa529dce5c1e52e750034d942a4"
  },
  {
    "url": "assets/js/4.5c3fc1f2.js",
    "revision": "e0dcece7bfa55645e10e7c557e6ee712"
  },
  {
    "url": "assets/js/5.e2f05ee6.js",
    "revision": "d42239c2ddbaf37dac9f531ddcd49f24"
  },
  {
    "url": "assets/js/6.d5a37669.js",
    "revision": "31da772e70764910a90cb80123109612"
  },
  {
    "url": "assets/js/7.47708277.js",
    "revision": "df8a664ebe1fad33ccd1db7ca0dbb5eb"
  },
  {
    "url": "assets/js/8.40fa00e1.js",
    "revision": "cc17e25b8b64b0749cc930c349647d20"
  },
  {
    "url": "assets/js/9.7e9299f3.js",
    "revision": "888b23090a171a59fc34b186a9b1a884"
  },
  {
    "url": "assets/js/app.5d751089.js",
    "revision": "e21a0058f9938517e699ded91d900b26"
  },
  {
    "url": "assets/js/vendors~flowchart.c8f00c70.js",
    "revision": "b7f9d7959687b396b688e789b2677f38"
  },
  {
    "url": "config/google.html",
    "revision": "52dea8100117d8f9b2c51a55b65acd97"
  },
  {
    "url": "config/icloudsecure.html",
    "revision": "a670cc673995c5170d98e4fb851de3cb"
  },
  {
    "url": "config/index.html",
    "revision": "d4c074ddec685d06019b4ecefc5366c0"
  },
  {
    "url": "examples/index.html",
    "revision": "0417e3e8eda70e02bdec37dbb0c78f4f"
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
    "revision": "88f0a749bed561d82abd8854ad9a9a31"
  },
  {
    "url": "guide/examples_cli.html",
    "revision": "ad8bfaaf48fd70881a8710c4c91548fb"
  },
  {
    "url": "guide/examples_lib.html",
    "revision": "f88c6ef07efdd7dfb256a9239e19660f"
  },
  {
    "url": "guide/examples.html",
    "revision": "9785fbfbb8170435b90afa815e8b57d9"
  },
  {
    "url": "guide/index.html",
    "revision": "8013389a468950567b5541f1675be482"
  },
  {
    "url": "guide/nodes.html",
    "revision": "0b30fa6f32d3d2bce7b68ed6bc91a6af"
  },
  {
    "url": "guide/sensors.html",
    "revision": "44d89fa9a9fbc3fdd199a00c329e74d1"
  },
  {
    "url": "guide/trigger.html",
    "revision": "06aa7f1dd7fc5eff2e66ba1720fd0bab"
  },
  {
    "url": "guide/upcoming.html",
    "revision": "4b6bfaf705c66835f022ba34c257381e"
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
    "revision": "2c663a7247f8d3c03a9d45cca11872f2"
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
