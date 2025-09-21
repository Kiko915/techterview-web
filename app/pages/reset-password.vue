<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '../../composables/useAuth'

// Disable server-side rendering for this page
definePageMeta({
  ssr: false
})

// Set page head metadata
useHead({
  title: 'Reset Password - TechTerview',
  meta: [
    {
      name: 'description',
      content: 'Create a new password for your TechTerview account.'
    }
  ]
})

// Auth composable
const { resetPassword, loading, error, clearError } = useAuth()

// Router and route
const router = useRouter()
const route = useRoute()

// Form state
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isResetSuccess = ref(false)

// Recovery parameters from URL
const userId = ref('')
const secret = ref('')
const isValidLink = ref(false)
const linkError = ref('')

// Form validation
const passwordValidation = computed(() => {
  const pwd = password.value
  const errors = []
  
  if (pwd.length < 8) errors.push('At least 8 characters')
  if (!/[A-Z]/.test(pwd)) errors.push('One uppercase letter')
  if (!/[a-z]/.test(pwd)) errors.push('One lowercase letter')
  if (!/\d/.test(pwd)) errors.push('One number')
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) errors.push('One special character')
  
  return {
    isValid: errors.length === 0,
    errors: errors
  }
})

const confirmPasswordValidation = computed(() => {
  if (!confirmPassword.value) return { isValid: true, errors: [] }
  
  return {
    isValid: password.value === confirmPassword.value,
    errors: password.value === confirmPassword.value ? [] : ['Passwords do not match']
  }
})

const isFormValid = computed(() => {
  return passwordValidation.value.isValid && 
         confirmPasswordValidation.value.isValid &&
         password.value.length > 0 &&
         confirmPassword.value.length > 0
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
  
  const success = await resetPassword(
    userId.value,
    secret.value,
    password.value,
    confirmPassword.value
  )
  
  if (success) {
    isResetSuccess.value = true
    // Redirect to login after 3 seconds
    setTimeout(() => {
      router.push('/login?message=Password reset successful. Please sign in with your new password.')
    }, 3000)
  }
}

// Check URL parameters on mount
onMounted(() => {
  const urlUserId = route.query.userId as string
  const urlSecret = route.query.secret as string
  
  if (!urlUserId || !urlSecret) {
    linkError.value = 'Invalid or missing reset link. Please request a new password reset.'
    isValidLink.value = false
  } else {
    userId.value = urlUserId
    secret.value = urlSecret
    isValidLink.value = true
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- Logo -->
      <NuxtLink to="/" class="flex justify-center">
        <img 
          src="/logo/techterview_wordmark_colored.png" 
          alt="TechTerview Logo" 
          class="h-12 w-auto"
        >
      </NuxtLink>
      
      <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">
        {{ isResetSuccess ? 'Password Reset Complete!' : 'Reset Your Password' }}
      </h2>
      
      <p class="mt-2 text-center text-sm text-gray-600">
        {{ isResetSuccess 
          ? 'Your password has been successfully updated. Redirecting to login...' 
          : 'Enter your new password below.' 
        }}
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <!-- Invalid Link Error -->
        <div v-if="!isValidLink" class="text-center space-y-4">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <Icon name="heroicons:exclamation-triangle" class="w-8 h-8 text-red-600" />
          </div>
          <div class="bg-red-50 border border-red-200 rounded-md p-4">
            <div class="flex">
              <Icon name="heroicons:exclamation-triangle" class="h-5 w-5 text-red-400" />
              <div class="ml-3">
                <p class="text-sm text-red-800">{{ linkError }}</p>
              </div>
            </div>
          </div>
          <NuxtLink
            to="/forgot-password"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Request New Reset Link
          </NuxtLink>
        </div>

        <!-- Success Message -->
        <div v-else-if="isResetSuccess" class="text-center space-y-4">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Icon name="heroicons:check" class="w-8 h-8 text-green-600" />
          </div>
          <div class="bg-green-50 border border-green-200 rounded-md p-4">
            <div class="flex">
              <Icon name="heroicons:check-circle" class="h-5 w-5 text-green-400" />
              <div class="ml-3">
                <p class="text-sm text-green-800">
                  Your password has been successfully reset! You will be redirected to the login page shortly.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Reset Password Form -->
        <div v-else>
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
            <!-- New Password Field -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div class="mt-1 relative">
                <UInput
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="new-password"
                  placeholder="Enter your new password"
                  size="lg"
                  :disabled="loading"
                  :color="!passwordValidation.isValid && password.length > 0 ? 'error' : undefined"
                  class="w-full pr-12"
                  required
                  @input="handleInputChange"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  :disabled="loading"
                >
                  <Icon 
                    :name="showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" 
                    class="w-5 h-5"
                  />
                </button>
              </div>
              <div v-if="!passwordValidation.isValid && password.length > 0" class="mt-1">
                <p v-for="error in passwordValidation.errors" :key="error" class="text-xs text-red-600">
                  • {{ error }}
                </p>
              </div>
            </div>

            <!-- Confirm Password Field -->
            <div>
              <label for="confirm-password" class="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <div class="mt-1 relative">
                <UInput
                  id="confirm-password"
                  v-model="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  autocomplete="new-password"
                  placeholder="Confirm your new password"
                  size="lg"
                  :disabled="loading"
                  :color="!confirmPasswordValidation.isValid && confirmPassword.length > 0 ? 'error' : undefined"
                  class="w-full pr-12"
                  required
                  @input="handleInputChange"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  :disabled="loading"
                >
                  <Icon 
                    :name="showConfirmPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" 
                    class="w-5 h-5"
                  />
                </button>
              </div>
              <div v-if="!confirmPasswordValidation.isValid && confirmPassword.length > 0" class="mt-1">
                <p v-for="error in confirmPasswordValidation.errors" :key="error" class="text-xs text-red-600">
                  • {{ error }}
                </p>
              </div>
            </div>

            <!-- Submit Button -->
            <div>
              <UButton
                type="submit"
                size="lg"
                :loading="loading"
                :disabled="!isFormValid || loading"
                class="w-full bg-primary hover:bg-blue-800 text-white"
                block
              >
                {{ loading ? 'Resetting Password...' : 'Reset Password' }}
              </UButton>
            </div>
          </form>
        </div>

        <!-- Back to Login Link -->
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