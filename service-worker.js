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
    "revision": "2491d87ad41ff8f0016cb026c6e62b09"
  },
  {
    "url": "assets/css/0.styles.556c3969.css",
    "revision": "040294803be4eccd5ef547c49771981e"
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
    "url": "assets/js/10.77e701bb.js",
    "revision": "93019f8596aecf6899afaefac50f7b59"
  },
  {
    "url": "assets/js/11.1e1985a6.js",
    "revision": "827f032c55b65fc4dc744c1e4c335d31"
  },
  {
    "url": "assets/js/12.669922a6.js",
    "revision": "13c805bea47fd239b806e1dabb9ca90d"
  },
  {
    "url": "assets/js/13.827c119e.js",
    "revision": "0cd4f30c5870dae15ef89c424a00691a"
  },
  {
    "url": "assets/js/14.474a3942.js",
    "revision": "414a59311bd06a9525f3ce3398c4b607"
  },
  {
    "url": "assets/js/15.a96a0add.js",
    "revision": "2430739f145e57111d7c6c9b7471317e"
  },
  {
    "url": "assets/js/16.4f7a147a.js",
    "revision": "6b249e7c3baf55d305a221ec72ba65e4"
  },
  {
    "url": "assets/js/17.4fcc3402.js",
    "revision": "3ccd9ffa69bb5e6da2439e55266f10f3"
  },
  {
    "url": "assets/js/18.3c9b8d0d.js",
    "revision": "c0f7ae1deef4f75d1ec47275dd04624b"
  },
  {
    "url": "assets/js/19.c86ed937.js",
    "revision": "454f072b1b7993ab748ea0318bd45014"
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
    "url": "assets/js/22.e9256c11.js",
    "revision": "2efa3615835e4430d5ebdbf8729ac7ad"
  },
  {
    "url": "assets/js/23.77d20c78.js",
    "revision": "817e4456c68e0911bec346b503dc9711"
  },
  {
    "url": "assets/js/3.a2dd137f.js",
    "revision": "91b517e0a78a4eb85215e7f0b3f3e260"
  },
  {
    "url": "assets/js/4.b47975f9.js",
    "revision": "38a3a909143adeefb429aa784dbadbda"
  },
  {
    "url": "assets/js/5.d3d1d3a4.js",
    "revision": "2b7999e9913dae990bc44e93a6e20026"
  },
  {
    "url": "assets/js/6.1efe4b93.js",
    "revision": "015e0c57ec5f53b6ff77060773195a9c"
  },
  {
    "url": "assets/js/7.9611c426.js",
    "revision": "b91adda46eff08962d3489503a440e62"
  },
  {
    "url": "assets/js/8.5790898f.js",
    "revision": "b10e01e645dc9354852066df8ef21302"
  },
  {
    "url": "assets/js/9.1e4982b2.js",
    "revision": "f0533832db58d257aeba6ea6d71d8496"
  },
  {
    "url": "assets/js/app.22b33125.js",
    "revision": "563e0b16cb870476e62fe2f6e8ca7eca"
  },
  {
    "url": "assets/js/vendors~flowchart.30ff2df1.js",
    "revision": "1e13df19858cb934bbbb7b4ed74ca13b"
  },
  {
    "url": "config/google.html",
    "revision": "0e48b5bab10260d0d22dfe012c32991b"
  },
  {
    "url": "config/icloudsecure.html",
    "revision": "2c4caddedaf2c2d9004c7d2fff5fb4b6"
  },
  {
    "url": "config/index.html",
    "revision": "71ad21ccd805586f9aef7e3bb4b89f73"
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
    "revision": "29a7cdfcd1daf1ca2aca1f64cc10c50b"
  },
  {
    "url": "guide/examples_cli.html",
    "revision": "9226bebb45887eb0f79ac9647f18401f"
  },
  {
    "url": "guide/examples_lib.html",
    "revision": "342293dfdd77ede685a9f48a8fc0fe02"
  },
  {
    "url": "guide/examples.html",
    "revision": "6c9f8f42c339b8904c60178dc5f146f6"
  },
  {
    "url": "guide/index.html",
    "revision": "39dd8c24f60e0a1e82c8a85687de0cd5"
  },
  {
    "url": "guide/nodered.html",
    "revision": "71d6b241ae8b582521b32d9e3c706ec1"
  },
  {
    "url": "guide/nodes.html",
    "revision": "d008e634e61ce9804bdaf5512d2bd2ac"
  },
  {
    "url": "guide/sensors.html",
    "revision": "3408d300ace54ad1355131a30984559a"
  },
  {
    "url": "guide/trigger.html",
    "revision": "d78a72ad259d9942e113ec005d5d996c"
  },
  {
    "url": "guide/upcoming.html",
    "revision": "3abc306f4d7dc58e699c5970aa3d768f"
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
    "revision": "c83beed58f3dfcc832bbfc5727f4915f"
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
