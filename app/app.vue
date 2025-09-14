<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'
import ComingSoon from '~/components/ComingSoon.vue'

// Expose environment variable to template
const isDevelopment = import.meta.env.MODE === 'development'
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
