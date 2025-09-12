// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    head: {
      title: 'TechTerview - AI powered interview prep platform'
    }
  },

  css: ['~/assets/css/main.css'],

  fonts: {
    families: [
      { name: 'Playfair Display', provider: 'google' },
      { name: 'Montserrat', provider: 'google' }
    ]
  },

  ui: {
    colorMode: false,
    theme: {
      colors: [
        'primary',
        'secondary', 
        'success',
        'info',
        'warning',
        'error',
        'neutral'
      ]
    }
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils'
  ]
})