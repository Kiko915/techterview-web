<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuth } from '../../composables/useAuth'

// Set page head metadata
useHead({
  title: 'Forgot Password - TechTerview',
  meta: [
    {
      name: 'description',
      content: 'Reset your TechTerview account password and regain access to your interview preparation tools.'
    }
  ]
})

// Auth composable
const { sendPasswordRecovery, loading, error, clearError } = useAuth()

// Form state
const email = ref('')
const isSubmitted = ref(false)
const successMessage = ref('')

// Form validation
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const isFormValid = computed(() => {
  return emailRegex.test(email.value.trim())
})

// Clear error when user types
const handleInputChange = () => {
  if (error.value) {
    clearError()
  }
}

// Handle form submission
const handleResetPassword = async () => {
  if (!isFormValid.value) return
  
  const success = await sendPasswordRecovery(email.value.trim())
  
  if (success) {
    isSubmitted.value = true
    successMessage.value = `We've sent a password recovery email to ${email.value.trim()}. Please check your inbox and follow the instructions to reset your password.`
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- Logo -->
      <NuxtImg 
        src="/logo/techterview_wordmark_colored.png" 
        alt="TechTerview" 
        class="h-12 mx-auto"
        loading="eager"
      />
      
      <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">
        {{ isSubmitted ? 'Check Your Email' : 'Forgot Password?' }}
      </h2>
      
      <p class="mt-2 text-center text-sm text-gray-600">
        {{ isSubmitted 
          ? 'We\'ve sent a password reset link to your email address.' 
          : 'Enter your email address and we\'ll send you a link to reset your password.' 
        }}
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div v-if="!isSubmitted">
          <!-- Error Message -->
          <div v-if="error" class="mb-6">
            <div class="bg-red-50 border border-red-200 rounded-md p-4">
              <div class="flex">
                <Icon name="heroicons:exclamation-triangle" class="h-5 w-5 text-red-400" />
                <div class="ml-3">
                  <p class="text-sm text-red-800">{{ error }}</p>
                </div>
              </div>
            </div>
          </div>

          <form @submit.prevent="handleResetPassword" class="space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div class="mt-1">
                <UInput
                  id="email"
                  v-model="email"
                  type="email"
                  autocomplete="email"
                  placeholder="Enter your email"
                  size="lg"
                  :disabled="loading"
                  class="w-full"
                  required
                  @input="handleInputChange"
                />
              </div>
            </div>

            <div>
              <UButton
                type="submit"
                size="lg"
                :loading="loading"
                :disabled="!isFormValid || loading"
                class="w-full bg-primary hover:bg-blue-800 text-white"
                block
              >
                {{ loading ? 'Sending...' : 'Send Reset Link' }}
              </UButton>
            </div>
          </form>
        </div>
        
        <div v-else class="text-center space-y-4">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Icon name="heroicons:check" class="w-8 h-8 text-green-600" />
          </div>
          <div class="bg-green-50 border border-green-200 rounded-md p-4">
            <div class="flex">
              <Icon name="heroicons:check-circle" class="h-5 w-5 text-green-400" />
              <div class="ml-3">
                <p class="text-sm text-green-800">{{ successMessage }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Remember your password?</span>
            </div>
          </div>

          <div class="mt-6">
            <NuxtLink
              to="/login"
              class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Back to Sign In
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>