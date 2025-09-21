import { initAppwrite } from '../utils/appwrite'

export default defineNuxtPlugin(() => {
  // Initialize Appwrite with hardcoded configuration
  // Note: In production, these should come from environment variables
  
  try {
    initAppwrite({
      endpoint: 'https://cloud.appwrite.io/v1',
      projectId: 'techterview' // Replace with your actual project ID
    })
    
    console.log('✅ Appwrite initialized successfully')
  } catch (error) {
    console.error('❌ Failed to initialize Appwrite:', error)
  }
})