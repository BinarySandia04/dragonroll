import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'en-US',

  title: 'Dragonroll Docs',
  description: 'Documentation for Dragonroll API for plugin development',

  theme: defaultTheme({
    logo: '/images/logo-light.png',
    logoDark: '/images/logo.png',

    navbar: ['/', '/get-started'],
  }),

  bundler: viteBundler(),
})
