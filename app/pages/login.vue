<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuth } from '../../composables/useAuth'

// Disable server-side rendering for this page
definePageMeta({
  ssr: false
})

// Set page head metadata
useHead({
  title: 'Sign In - TechTerview',
  meta: [
    {
      name: 'description',
      content: 'Sign in to your TechTerview account and access AI-powered interview preparation platform.'
    }
  ]
})

// Router for navigation (using Nuxt's auto-imported useRouter)
const router = useRouter()

// Auth composable
const { user, getCurrentUser, loginWithGoogle } = useAuth()

// Form state
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const isLoading = ref(false)
const formTouched = ref({
  email: false,
  password: false
})
const loginError = ref('')
const successMessage = ref('')
const loginAttempts = ref(0)
const maxLoginAttempts = 3
const cooldownTime = ref(0)
let cooldownInterval: NodeJS.Timeout | null = null

// Loading state for authentication check
const isCheckingAuth = ref(true)

// Check if we should skip auth check (using session storage for better tracking)
const shouldSkipAuthCheck = () => {
  try {
    const publicPages = ['/login', '/signup', '/forgot-password', '/']
    const currentPath = window.location.pathname
    
    // Check if user was recently on a public page (within last 30 seconds)
    const lastPublicPageVisit = sessionStorage.getItem('lastPublicPageVisit')
    const lastPublicPage = sessionStorage.getItem('lastPublicPage')
    
    console.log('Login page: Current path:', currentPath)
    console.log('Login page: Last public page:', lastPublicPage)
    console.log('Login page: Last visit timestamp:', lastPublicPageVisit)
    
    if (lastPublicPageVisit && lastPublicPage) {
      const timeSinceLastVisit = Date.now() - parseInt(lastPublicPageVisit)
      const wasRecentlyOnPublicPage = timeSinceLastVisit < 30000 // 30 seconds
      const wasOnPublicPage = publicPages.includes(lastPublicPage)
      
      console.log('Login page: Time since last visit (ms):', timeSinceLastVisit)
      console.log('Login page: Was recently on public page:', wasRecentlyOnPublicPage && wasOnPublicPage)
      
      if (wasRecentlyOnPublicPage && wasOnPublicPage) {
        return true
      }
    }
    
    // Update session storage for this visit
    sessionStorage.setItem('lastPublicPage', currentPath)
    sessionStorage.setItem('lastPublicPageVisit', Date.now().toString())
    
    return false
  } catch (error) {
    console.log('Login page: Error in shouldSkipAuthCheck:', error)
    return false
  }
}

// Handle query parameters and check authentication on mount
onMounted(async () => {
  const route = useRoute()
  if (route.query.message) {
    successMessage.value = route.query.message as string
    // Clear the message after showing it
    setTimeout(() => {
      successMessage.value = ''
    }, 5000)
  }
  
  // Handle OAuth errors
  if (route.query.error === 'oauth_failed') {
    if (route.query.reason === 'email_exists') {
      loginError.value = 'An account with this Google email already exists. Please sign in with your email and password instead, or use a different Google account.'
    } else {
      loginError.value = 'Google sign-in failed. Please try again.'
    }
    // Clear the error from URL
    await router.replace({ query: {} })
  }
  
  // Check if user is already authenticated
  
  // Quick check: if we already have a user in state, redirect immediately
  if (user.value && user.value.$id) {
    console.log('Login page: User already in state, redirecting to dashboard')
    await router.push('/dashboard')
    return
  }
  
  // Optimization: Skip expensive API call if coming from public pages
  if (shouldSkipAuthCheck()) {
    console.log('Login page: Skipping auth check (coming from public page)')
    isCheckingAuth.value = false
    return
  }
  
  // Only make API call if necessary (not coming from public pages)
  try {
    isCheckingAuth.value = true
    console.log('Login page: Checking authentication with API...')
    
    const currentUser = await getCurrentUser()
    console.log('Login page: Current user from API:', currentUser)
    
    if (currentUser && currentUser.$id) {
      // User is already logged in, redirect to dashboard
      console.log('Login page: User is authenticated, redirecting to dashboard')
      await router.push('/dashboard')
      return
    }
    
    // User is not authenticated, show login form
    console.log('Login page: User is not authenticated, showing login form')
    isCheckingAuth.value = false
  } catch (error) {
    // User is not authenticated, show login form
    console.log('Login page: Authentication check failed:', error)
    isCheckingAuth.value = false
  }
})

// Cleanup on unmount
onUnmounted(() => {
  if (cooldownInterval) {
    clearInterval(cooldownInterval)
    cooldownInterval = null
  }
})

// Enhanced form validation
const validationRules = {
  email: {
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  },
  password: {
    required: true,
    minLength: 6,
    maxLength: 128
  }
}

// Field validation functions
const validateEmail = computed(() => {
  const value = email.value.trim()
  const errors = []
  
  if (!value && formTouched.value.email) {
    errors.push('Email is required')
  } else if (value && !validationRules.email.pattern.test(value)) {
    errors.push('Please enter a valid email address')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
})

const validatePassword = computed(() => {
  const value = password.value
  const errors = []
  
  if (!value && formTouched.value.password) {
    errors.push('Password is required')
  } else if (value) {
    if (value.length < validationRules.password.minLength) {
      errors.push(`Password must be at least ${validationRules.password.minLength} characters`)
    }
    if (value.length > validationRules.password.maxLength) {
      errors.push(`Password must be less than ${validationRules.password.maxLength} characters`)
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
})

// Enhanced form validation
const isFormValid = computed(() => {
  return validateEmail.value.isValid &&
         validatePassword.value.isValid &&
         email.value.length > 0 &&
         password.value.length > 0
})

// Touch handlers
const handleFieldBlur = (fieldName: string) => {
  formTouched.value[fieldName as keyof typeof formTouched.value] = true
  // Clear login error when user starts typing after an error
  if (loginError.value) {
    loginError.value = ''
  }
}

// Clear error when user types
const handleInputChange = () => {
  if (loginError.value) {
    loginError.value = ''
  }
}

// Handle form submission
const handleSignIn = async () => {
  // Mark all fields as touched for validation display
  Object.keys(formTouched.value).forEach(key => {
    formTouched.value[key as keyof typeof formTouched.value] = true
  })
  
  // Clear any previous login errors
  loginError.value = ''
  
  // Validate form before submission
  if (!isFormValid.value) {
    // Focus on first invalid field
    const firstInvalidField = getFirstInvalidField()
    if (firstInvalidField) {
      document.getElementById(firstInvalidField)?.focus()
    }
    return
  }
  
  isLoading.value = true
  
  try {
    // Prepare login data
    const loginData = {
      email: email.value.trim().toLowerCase(),
      password: password.value,
      rememberMe: rememberMe.value
    }
    
    // Use Appwrite authentication
    const { login } = useAuth()
    
    // Attempt login with Appwrite
    const loginSuccess = await login({
      email: loginData.email,
      password: loginData.password
    })
    
    if (!loginSuccess) {
      throw new Error('Login failed')
    }
    
    // Clear form on success
    clearForm()
    
    // Reset login attempts on successful login
    loginAttempts.value = 0
    
    // Show success message
    loginError.value = ''
    successMessage.value = 'Login successful! Welcome back.'
    
    // Redirect after successful login
    setTimeout(async () => {
      await router.push('/dashboard')
    }, 1000) // Small delay to show success message
  } catch (error: any) {
    console.error('Sign in error:', error)
    
    // Increment login attempts
    loginAttempts.value++
    
    // Handle rate limiting
    if (loginAttempts.value >= maxLoginAttempts) {
      cooldownTime.value = 30 // 30 second cooldown
      startCooldown()
      loginError.value = `Too many failed attempts. Please wait ${cooldownTime.value} seconds before trying again.`
    } else {
      // Handle specific error cases
      loginError.value = getErrorMessage(error)
      
      // Show remaining attempts
      const remaining = maxLoginAttempts - loginAttempts.value
      if (remaining > 0) {
        loginError.value += ` (${remaining} attempt${remaining > 1 ? 's' : ''} remaining)`
      }
    }
    
    // Focus back to email field for retry (if not in cooldown)
    if (cooldownTime.value === 0) {
      setTimeout(() => {
        document.getElementById('email')?.focus()
      }, 100)
    }
    
    // TODO: Show error toast notification
    // useToast().add({ 
    //   title: 'Sign In Failed',
    //   description: loginError.value,
    //   color: 'red'
    // })
  } finally {
    isLoading.value = false
  }
}

// Helper functions
const getFirstInvalidField = (): string | null => {
  if (!validateEmail.value.isValid) return 'email'
  if (!validatePassword.value.isValid) return 'password'
  return null
}

const getErrorMessage = (error: any): string => {
  // Handle Appwrite error codes
  if (error?.code) {
    switch (error.code) {
      case 401:
        if (error.type === 'user_session_already_exists') {
          return 'Session conflict detected. Attempting to resolve automatically...'
        }
        return 'Invalid email or password. Please check your credentials and try again.'
      case 'user_invalid_credentials':
        return 'Invalid email or password. Please check your credentials and try again.'
      case 'user_not_found':
        return 'No account found with this email address. Please sign up first.'
      case 'user_blocked':
        return 'Your account has been temporarily blocked. Please contact support.'
      case 'user_email_not_confirmed':
        return 'Please verify your email address before signing in.'
      case 'general_rate_limit_exceeded':
        return 'Too many login attempts. Please wait a moment and try again.'
      default:
        break
    }
  }
  
  if (error?.message) {
    // Handle generic error messages
    if (error.message.includes('email') || error.message.includes('password') || error.message.includes('credentials')) {
      return 'Invalid email or password. Please try again.'
    }
    if (error.message.includes('account')) return 'Account not found or inactive'
    if (error.message.includes('locked')) return 'Account temporarily locked. Try again later.'
    if (error.message.includes('network')) return 'Network error. Please check your connection'
    if (error.message.includes('rate')) return 'Too many login attempts. Please wait a moment.'
    return error.message
  }
  
  return 'An unexpected error occurred. Please try again.'
}

const startCooldown = () => {
  // Clear any existing interval
  if (cooldownInterval) {
    clearInterval(cooldownInterval)
  }
  
  cooldownInterval = setInterval(() => {
    cooldownTime.value--
    if (cooldownTime.value <= 0) {
      clearInterval(cooldownInterval!)
      cooldownInterval = null
      loginAttempts.value = 0 // Reset attempts after cooldown
      loginError.value = ''
    } else {
      loginError.value = `Too many failed attempts. Please wait ${cooldownTime.value} seconds before trying again.`
    }
  }, 1000)
}

const clearForm = () => {
  email.value = ''
  password.value = ''
  rememberMe.value = false
  showPassword.value = false
  loginError.value = ''
  successMessage.value = ''
  
  // Reset cooldown and login attempts
  cooldownTime.value = 0
  loginAttempts.value = 0
  if (cooldownInterval) {
    clearInterval(cooldownInterval)
    cooldownInterval = null
  }
  
  // Reset touch states
  Object.keys(formTouched.value).forEach(key => {
    formTouched.value[key as keyof typeof formTouched.value] = false
  })
}

// Computed property to check if form is disabled due to cooldown
const isFormDisabled = computed(() => {
  return isLoading.value || cooldownTime.value > 0
})

// Handle Google sign in
const handleGoogleSignIn = () => {
  loginWithGoogle()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Left side - Gradient with quote (hidden on mobile) -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600">
        <!-- Animated gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-400/20 to-blue-300/20 animate-pulse"></div>
        
        <!-- Flowing lines effect -->
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-full">
            <svg class="w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="none">
              <path d="M0,100 C150,200 250,0 400,100 L400,200 C250,300 150,100 0,200 Z" fill="rgba(255,255,255,0.1)"/>
              <path d="M0,200 C150,300 250,100 400,200 L400,300 C250,400 150,200 0,300 Z" fill="rgba(255,255,255,0.05)"/>
              <path d="M0,300 C150,400 250,200 400,300 L400,400 C250,500 150,300 0,400 Z" fill="rgba(255,255,255,0.1)"/>
              <path d="M0,400 C150,500 250,300 400,400 L400,500 C250,600 150,400 0,500 Z" fill="rgba(255,255,255,0.05)"/>
            </svg>
          </div>
        </div>
      </div>
      
      <!-- Content -->
      <div class="relative z-10 flex flex-col justify-between p-12 text-white">
        <div>
          <p class="text-sm font-medium tracking-wider opacity-80">AI-POWERED PREPARATION</p>
        </div>
        
        <div class="space-y-6">
          <h1 class="text-5xl font-bold leading-tight">
            Master<br>
            Your Next<br>
            Interview
          </h1>
          <p class="text-lg opacity-90 max-w-md">
            Welcome back! Continue your journey to interview excellence with personalized AI coaching and real-time feedback.
          </p>
        </div>
        
        <div>
          <NuxtImg 
            src="/logo/techterview_wordmark.png" 
            alt="TechTerview" 
            class="h-8 filter invert brightness-0"
            loading="eager"
            style="filter: invert(1) brightness(100%);"
          />
        </div>
      </div>
    </div>

    <!-- Right side - Login form -->
    <div class="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16">
      <div class="w-full max-w-md mx-auto">
        <!-- Loading state while checking authentication -->
        <div v-if="isCheckingAuth" class="text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 class="text-lg font-medium text-gray-900 mb-2">Checking Authentication...</h2>
          <p class="text-sm text-gray-600">Please wait while we verify your session</p>
        </div>

        <!-- Login form (only shown when not checking auth) -->
        <div v-else>
          <!-- Logo for mobile -->
          <div class="lg:hidden mb-8 text-center">
            <NuxtImg 
              src="/logo/techterview_wordmark_colored.png" 
              alt="TechTerview" 
              class="h-10 mx-auto"
              loading="eager"
            />
          </div>

          <!-- Logo for desktop -->
          <div class="hidden lg:block mb-8">
            <NuxtImg 
              src="/logo/techterview_wordmark_colored.png" 
              alt="TechTerview" 
              class="h-8"
              loading="eager"
            />
          </div>

        <div class="space-y-8">
          <!-- Header -->
          <div class="text-center lg:text-left">
            <h2 class="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p class="mt-2 text-gray-600">Enter your email and password to access your account</p>
          </div>

          <!-- Success Message Alert -->
          <div v-if="successMessage" class="mb-6">
            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="flex items-center">
                <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-500 mr-3" />
                <p class="text-sm text-green-800">{{ successMessage }}</p>
              </div>
            </div>
          </div>

          <!-- Login Error Alert -->
          <div v-if="loginError" class="mb-6">
            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
              <div class="flex items-center">
                <Icon name="heroicons:exclamation-triangle" class="w-5 h-5 text-red-500 mr-3" />
                <p class="text-sm text-red-800">{{ loginError }}</p>
              </div>
            </div>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSignIn" class="space-y-6">
            <!-- Email field -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email <span class="text-red-500">*</span>
              </label>
              <UInput
                id="email"
                v-model="email"
                type="email"
                placeholder="Enter your email"
                size="lg"
                :disabled="isFormDisabled"
                :color="!validateEmail.isValid && formTouched.email ? 'error' : undefined"
                class="w-full"
                autocomplete="email"
                required
                @blur="handleFieldBlur('email')"
                @input="handleInputChange"
              />
              <div v-if="!validateEmail.isValid && formTouched.email" class="mt-1">
                <p v-for="error in validateEmail.errors" :key="error" class="text-xs text-red-600">
                  {{ error }}
                </p>
              </div>
            </div>

            <!-- Password field -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                Password <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <UInput
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Enter your password"
                  size="lg"
                  :disabled="isFormDisabled"
                  :color="!validatePassword.isValid && formTouched.password ? 'error' : undefined"
                  class="w-full pr-12"
                  autocomplete="current-password"
                  required
                  @blur="handleFieldBlur('password')"
                  @input="handleInputChange"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  :disabled="isFormDisabled"
                >
                  <Icon 
                    :name="showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" 
                    class="w-5 h-5"
                  />
                </button>
              </div>
              <div v-if="!validatePassword.isValid && formTouched.password" class="mt-1">
                <p v-for="error in validatePassword.errors" :key="error" class="text-xs text-red-600">
                  {{ error }}
                </p>
              </div>
            </div>

            <!-- Remember me and Forgot password -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <UCheckbox
                  id="remember-me"
                  v-model="rememberMe"
                  :disabled="isFormDisabled"
                />
                <label for="remember-me" class="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <NuxtLink
                to="/forgot-password"
                class="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot Password
              </NuxtLink>
            </div>

            <!-- Sign in button -->
            <UButton
              type="submit"
              size="lg"
              :loading="isLoading"
              :disabled="!isFormValid || isFormDisabled"
              class="w-full bg-primary hover:bg-blue-800 text-white mb-2"
              block
            >
              {{ 
                cooldownTime > 0 ? `Wait ${cooldownTime}s` : 
                isLoading ? 'Signing In...' : 
                'Sign In' 
              }}
            </UButton>

            <!-- Google sign in -->
            <UButton
              type="button"
              variant="outline"
              size="lg"
              @click="handleGoogleSignIn"
              :disabled="isFormDisabled"
              class="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
              block
            >
              <template #leading>
                <Icon name="logos:google-icon" class="w-5 h-5" />
              </template>
              Sign In with Google
            </UButton>
          </form>

          <!-- Sign up link -->
          <div class="text-center">
            <p class="text-sm text-gray-600">
              Don't have an account?
              <NuxtLink
                to="/signup"
                class="font-medium text-blue-600 hover:text-blue-700 ml-1"
              >
                Sign Up
              </NuxtLink>
            </p>
          </div>
        </div>
        </div> <!-- Close conditional div -->
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom animations for the gradient background */
@keyframes flow {
  0%, 100% { transform: translateX(-50px) translateY(-50px) scale(1); }
  50% { transform: translateX(50px) translateY(50px) scale(1.1); }
}

.animate-flow {
  animation: flow 20s ease-in-out infinite;
}

/* Ensure proper responsive behavior */
@media (max-width: 1023px) {
  .min-h-screen {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}
</style>