<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'
import ComingSoon from '~/components/ComingSoon.vue'
import { initAppwrite } from '../utils/appwrite'

// Expose environment variable to template
const isDevelopment = import.meta.env.MODE === 'development'

// Initialize Appwrite on client side
onMounted(() => {
  const config = useRuntimeConfig()
  
  try {
    initAppwrite({
      endpoint: config.public.appwrite.endpoint,
      projectId: config.public.appwrite.projectId
    })
    
    console.log('✅ Appwrite initialized successfully')
    console.log('📡 Endpoint:', config.public.appwrite.endpoint)
    console.log('🚀 Project ID:', config.public.appwrite.projectId)
  } catch (error) {
    console.error('❌ Failed to initialize Appwrite:', error)
    console.error('Config received:', config.public.appwrite)
  }
})
</script>

<template>
  <UApp>
    <template v-if="!isDevelopment">
      <ComingSoon />
    </template>
    <template v-else>
      <!-- Development mode - show main app content -->
      <NuxtPage />
    </template>
  </UApp>
  <Analytics />
</template>
