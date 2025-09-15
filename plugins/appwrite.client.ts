import { initAppwrite } from '../utils/appwrite'

export default defineNuxtPlugin({
  name: 'appwrite',
  parallel: true,
  setup() {
    // Get configuration from runtime config
    const config = useRuntimeConfig()
    
    try {
      // Initialize Appwrite
      const services = initAppwrite({
        endpoint: config.public.appwrite.endpoint,
        projectId: config.public.appwrite.projectId
      })
      
      console.log('✅ Appwrite initialized successfully')
      
      // Return services for use in the app
      return {
        provide: {
          appwrite: services
        }
      }
    } catch (error) {
      console.error('❌ Failed to initialize Appwrite:', error)
      throw error
    }
  }
})