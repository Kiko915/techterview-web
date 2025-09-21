<script setup lang="ts">
import { useAuth } from '../../composables/useAuth'

// Disable server-side rendering for this page
definePageMeta({
  ssr: false
})

// Set page head metadata
useHead({
  title: 'Dashboard - TechTerview',
  meta: [
    {
      name: 'description',
      content: 'Your TechTerview dashboard - AI-powered interview preparation platform.'
    }
  ]
})

// Get user info from auth
const { user, logout, getCurrentUser } = useAuth()

// Loading state for authentication check
const isCheckingAuth = ref(true)

// Check authentication status on page load
const checkAuth = async () => {
  try {
    isCheckingAuth.value = true
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      // User is not authenticated, redirect to login
      await navigateTo('/login')
      return
    }
    // Authentication successful
    isCheckingAuth.value = false
  } catch (error) {
    // Error getting user, redirect to login
    console.error('Authentication check failed:', error)
    await navigateTo('/login')
  }
}

// Check authentication when component mounts
onMounted(() => {
  checkAuth()
})

// Handle logout
const handleLogout = async () => {
  const success = await logout()
  // The logout function already redirects to login on success
  // So we only need to handle it if there's an error
  if (!success) {
    // Show error message if logout failed
    console.error('Logout failed')
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <!-- Loading state while checking authentication -->
    <div v-if="isCheckingAuth" class="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <div class="text-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 class="text-lg font-medium text-gray-900 mb-2">Checking Authentication...</h2>
        <p class="text-sm text-gray-600">Please wait while we verify your session</p>
      </div>
    </div>

    <!-- Dashboard content (only shown when authenticated) -->
    <div v-else class="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
        <p class="text-gray-600 mb-6">✅ Authentication successful!</p>
        
        <div class="space-y-4">
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <p class="text-green-800 text-sm">You are successfully logged in</p>
          </div>
          
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p class="text-blue-800 text-sm">User ID: {{ user?.$id || 'Loading...' }}</p>
            <p class="text-blue-800 text-sm">Email: {{ user?.email || 'Loading...' }}</p>
          </div>
          
          <button 
            @click="handleLogout"
            class="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any component-specific styles here */
</style>