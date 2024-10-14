import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'

export default defineUserConfig({
  lang: 'en-US',

  title: 'Dragonroll Docs',
  description: 'Documentation for Dragonroll API for plugin development',

  theme: defaultTheme({
    logo: '/images/logo-light.png',
    logoDark: '/images/logo.png',

    navbar: [
      {
        text: "Guides",
        prefix: "/guide/",
        link: "/guide/",
        children: ['/get-started', '/firstplugin']
      },

      {
        text: "Reference",
        prefix: "/api/",
        link: "/api/",
        children: [
          {
            text: "Plugin",
            prefix: "plugin/",
            collapsable: true,
            children: ['/plugin/plugin.json']
          },
          {
            text: "Client API",
            prefix: "client/",
            collapsable: true,
            children: ['/client/api']
          },
          {
            text: "Server API",
            prefix: "server/",
            children: ['/server/api']
          }
        ]
      }
    ],

    repo: 'https://git.aranroig.com/BinarySandia04/dragonroll',
  }),

  bundler: viteBundler(),
  plugins: [
    prismjsPlugin({
      themes: {
        light: 'duotone-light',
        dark: 'duotone-space'
      }
    })
  ]
})
