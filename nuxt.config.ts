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
  ],

  runtimeConfig: {
    // Private keys (only available on server-side)
    // Add any private Appwrite keys here if needed

    // Public keys (exposed to client-side)
    public: {
      appwrite: {
        endpoint: process.env.NUXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
        projectId: process.env.NUXT_PUBLIC_APPWRITE_PROJECT_ID || '',
        databaseId: process.env.NUXT_PUBLIC_APPWRITE_DATABASE_ID || '',
        collections: {
          users: process.env.NUXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID || 'users',
          interviews: process.env.NUXT_PUBLIC_APPWRITE_INTERVIEWS_COLLECTION_ID || 'interviews',
          questions: process.env.NUXT_PUBLIC_APPWRITE_QUESTIONS_COLLECTION_ID || 'questions',
          responses: process.env.NUXT_PUBLIC_APPWRITE_RESPONSES_COLLECTION_ID || 'responses',
          sessions: process.env.NUXT_PUBLIC_APPWRITE_SESSIONS_COLLECTION_ID || 'sessions'
        },
        bucketId: process.env.NUXT_PUBLIC_APPWRITE_BUCKET_ID || ''
      }
    }
  }
})