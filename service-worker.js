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
    "revision": "2db08193f4fe12912ada1e5e063ef594"
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
    "url": "assets/js/10.78c34079.js",
    "revision": "55718ba835312ba2da4016f9b67c0574"
  },
  {
    "url": "assets/js/11.192f1b83.js",
    "revision": "dceb60ca84f69520ab5638f656b2b9d6"
  },
  {
    "url": "assets/js/12.1151e324.js",
    "revision": "9042fe8fdfa87b86c0506844a03b0d4d"
  },
  {
    "url": "assets/js/13.7fe977ac.js",
    "revision": "c19766e44f783effb79bbf3199e0eaa9"
  },
  {
    "url": "assets/js/14.8a0a559f.js",
    "revision": "d8797f02d4e24ba0f436633af7c93e65"
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
    "url": "assets/js/17.6351cfb0.js",
    "revision": "c484a922d891fb7fe4770cac3481f5eb"
  },
  {
    "url": "assets/js/18.8ef203c2.js",
    "revision": "629a4425b68c88f2ea5f6903ded90f2c"
  },
  {
    "url": "assets/js/19.192227a0.js",
    "revision": "7022b7b4480a5aa6d7053e7541b1f9b9"
  },
  {
    "url": "assets/js/20.1c434b64.js",
    "revision": "9130bc7d7279ff2713ae3811343700fe"
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
    "url": "assets/js/5.33ba41d4.js",
    "revision": "d99b52a076aaeccd3db37eb49dc1b42b"
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
    "url": "assets/js/app.a56f6db3.js",
    "revision": "d3a86b4878006f71b831fd8dc495e5fd"
  },
  {
    "url": "assets/js/vendors~flowchart.4bff301a.js",
    "revision": "43994a76ab1ae28300d9bee21ed31163"
  },
  {
    "url": "config/index.html",
    "revision": "11a06d4d5a5b3d5371fdb2f8c7320477"
  },
  {
    "url": "examples/cli.html",
    "revision": "0422aa8472adf650bb20315e3c4cd701"
  },
  {
    "url": "examples/index.html",
    "revision": "76a61aa4ea895e04721d9bf32bf8f473"
  },
  {
    "url": "examples/lib.html",
    "revision": "c9870300bab74618b80777e5bf88db3c"
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
    "revision": "1c6d7cc10612ff4619e1695e0eb24577"
  },
  {
    "url": "guide/examples_cli.html",
    "revision": "d5483589f734716b16657d5f9e05d952"
  },
  {
    "url": "guide/examples_lib.html",
    "revision": "7113f6bd9b25e7ccc73089f8d783357e"
  },
  {
    "url": "guide/examples.html",
    "revision": "e4280741107cdf9392386df21cefdc0c"
  },
  {
    "url": "guide/icloudsecure.html",
    "revision": "64e1b7b6e404269511118fdbdf1d3925"
  },
  {
    "url": "guide/index.html",
    "revision": "7339b4d3023cd1f62c8f5c5a99e1e20e"
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
    "revision": "7ebc00822dac6c084ab30b73c876fe7b"
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
