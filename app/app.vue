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
    <!-- You can add your development content here if needed -->
    development mode.
  </UApp>
  <Analytics />
</template>
