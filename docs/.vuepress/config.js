
import { defaultTheme } from 'vuepress'
import { searchPlugin } from '@vuepress/plugin-search'
import { copyCodePlugin } from "vuepress-plugin-copy-code2";
import { pwaPlugin } from '@vuepress/plugin-pwa'
export default {
  theme: defaultTheme({

    repo: 'naimo84/kalender-events',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    sidebarDepth: 3,
    navbar: [
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
          text: 'Debug',
          link: '/guide/debug',
          collapsable: false
        },
        {
          text: 'Node-RED',
          link: '/guide/nodes',
          collapsable: false,
          children: [
            '/guide/upcoming',
            '/guide/sensors',
            '/guide/trigger',
            '/guide/experimental',
          ]
        },
        {
          text: 'Examples',
          collapsable: false,
          link: '/guide/examples',
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
          text: 'Google',
          link: '/config/google',
          collapsable: false
        },
        {
          text: 'iCloud secure',
          link: '/config/icloudsecure',
          collapsable: false
        },
      ]

    },
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        lastUpdated: 'Last Updated',
       
        
      }
    }

  }),
  plugins: [
    searchPlugin({
      // options
    }),
    pwaPlugin({
      // options
    }),
    copyCodePlugin({
      // your options
    }),
  ],
  
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
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
}
