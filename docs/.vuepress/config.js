module.exports = {
  locales: {
    '/': {
      lang: 'en-US',
      title: 'kalender-events',
      description: 'This Node module gets the events from an ical-URL, a caldav-server or from iCloud.'
    }
  },
  base: '/kalender-events/',
  dest: './build',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#706B69' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  plugins: {
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: {
        '/': {
          message: "New content is available.",
          buttonText: "Refresh"
        }
      }
    },
    'vuepress-plugin-code-copy': {
      color: '#F6EEE9',
      backgroundColor: "#706B69",
    },
    'flowchart': true

  },
  theme: '@vuepress/theme-default',
  themeConfig: {
    repo: 'naimo84/kalender-events',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    sidebarDepth: 3,
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        lastUpdated: 'Last Updated',
        nav: [
          {
            text: 'Guide',
            link: '/guide/'
          },
          {
            text: 'Configuration',
            link: '/config/'
          }
        ],
        sidebar: {
          '/guide/': [
            '/guide/',
            {
              title: 'Debug',
              path: '/guide/debug',
              collapsable: false
            },
            {
              title: 'Node-RED',
              path: '/guide/nodes',
              collapsable: false,
              children: [
                '/guide/upcoming',
                '/guide/sensors',
                '/guide/trigger',
                '/guide/experimental',
              ]
            },
            {
              title: 'Examples',
              collapsable: false,
              path: '/guide/examples',
              children: [
                '/guide/nodered',
                '/guide/examples_lib',
                '/guide/examples_cli',
              ]
            },
          ],
          '/config/': [
            '/config/',
            {
              title: 'Google',
              path: '/config/google',
              collapsable: false
            },
            {
              title: 'iCloud secure',
              path: '/config/icloudsecure',
              collapsable: false
            },
          ]

        }
      }
    }
  }
}
