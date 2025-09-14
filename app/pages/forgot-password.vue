<script setup lang="ts">
import { ref, computed } from 'vue'

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

// Form state
const email = ref('')
const isLoading = ref(false)
const isSubmitted = ref(false)

// Form validation
const isFormValid = computed(() => {
  return email.value.includes('@')
})

// Handle form submission
const handleResetPassword = async () => {
  if (!isFormValid.value) return
  
  isLoading.value = true
  
  try {
    // TODO: Implement actual password reset logic
    console.log('Reset password for:', email.value)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    isSubmitted.value = true
  } catch (error) {
    console.error('Reset password error:', error)
  } finally {
    isLoading.value = false
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
                  :disabled="isLoading"
                  class="w-full"
                  required
                />
              </div>
            </div>

            <div>
              <UButton
                type="submit"
                size="lg"
                :loading="isLoading"
                :disabled="!isFormValid || isLoading"
                class="w-full bg-black hover:bg-gray-800 text-white"
                block
              >
                {{ isLoading ? 'Sending...' : 'Send Reset Link' }}
              </UButton>
            </div>
          </form>
        </div>
        
        <div v-else class="text-center space-y-4">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Icon name="heroicons:check" class="w-8 h-8 text-green-600" />
          </div>
          <p class="text-sm text-gray-600">
            If an account with <strong>{{ email }}</strong> exists, you'll receive a password reset email shortly.
          </p>
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

          <div class="mt-6 text-center">
            <NuxtLink
              to="/login"
              class="font-medium text-blue-600 hover:text-blue-500"
            >
              Back to Sign In
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>