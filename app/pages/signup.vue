<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuth } from '../../composables/useAuth'

// Disable server-side rendering for this page
definePageMeta({
  ssr: false
})

// Set page head metadata
useHead({
  title: 'Sign Up - TechTerview',
  meta: [
    {
      name: 'description',
      content: 'Create your TechTerview account and start your AI-powered interview preparation journey.'
    }
  ]
})

// Router for navigation (using Nuxt's auto-imported useRouter)
const router = useRouter()

// Auth composable
const { user, getCurrentUser, signupWithGoogle } = useAuth()

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
    
    console.log('Signup page: Current path:', currentPath)
    console.log('Signup page: Last public page:', lastPublicPage)
    console.log('Signup page: Last visit timestamp:', lastPublicPageVisit)
    
    if (lastPublicPageVisit && lastPublicPage) {
      const timeSinceLastVisit = Date.now() - parseInt(lastPublicPageVisit)
      const wasRecentlyOnPublicPage = timeSinceLastVisit < 30000 // 30 seconds
      const wasOnPublicPage = publicPages.includes(lastPublicPage)
      
      console.log('Signup page: Time since last visit (ms):', timeSinceLastVisit)
      console.log('Signup page: Was recently on public page:', wasRecentlyOnPublicPage && wasOnPublicPage)
      
      if (wasRecentlyOnPublicPage && wasOnPublicPage) {
        return true
      }
    }
    
    // Update session storage for this visit
    sessionStorage.setItem('lastPublicPage', currentPath)
    sessionStorage.setItem('lastPublicPageVisit', Date.now().toString())
    
    return false
  } catch (error) {
    console.log('Signup page: Error in shouldSkipAuthCheck:', error)
    return false
  }
}

// Check authentication on mount
onMounted(async () => {
  const route = useRoute()
  
  // Handle OAuth errors
  if (route.query.error === 'oauth_failed') {
    if (route.query.reason === 'email_exists') {
      signupError.value = 'An account with this Google email already exists. Please sign in instead, or use a different Google account.'
    } else {
      signupError.value = 'Google sign-up failed. Please try again.'
    }
    // Clear the error from URL
    await router.replace({ query: {} })
  }
  
  // Check if user is already authenticated  
  // Quick check: if we already have a user in state, redirect immediately
  if (user.value && user.value.$id) {
    console.log('Signup page: User already in state, redirecting to dashboard')
    await router.push('/dashboard')
    return
  }
  
  // Optimization: Skip expensive API call if coming from public pages
  if (shouldSkipAuthCheck()) {
    console.log('Signup page: Skipping auth check (coming from public page)')
    isCheckingAuth.value = false
    return
  }
  
  // Only make API call if necessary (not coming from public pages)
  try {
    isCheckingAuth.value = true
    console.log('Signup page: Checking authentication with API...')
    
    const currentUser = await getCurrentUser()
    console.log('Signup page: Current user from API:', currentUser)
    
    if (currentUser && currentUser.$id) {
      // User is already logged in, redirect to dashboard
      console.log('Signup page: User is authenticated, redirecting to dashboard')
      await router.push('/dashboard')
      return
    }
    
    // User is not authenticated, show signup form
    console.log('Signup page: User is not authenticated, showing signup form')
    isCheckingAuth.value = false
  } catch (error) {
    // User is not authenticated, show signup form
    console.log('Signup page: Authentication check failed:', error)
    isCheckingAuth.value = false
  }
})

// Form state
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeToTerms = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const signupError = ref('')
const formTouched = ref({
  firstName: false,
  lastName: false,
  email: false,
  password: false,
  confirmPassword: false
})

// Enhanced form validation
const validationRules = {
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/
  },
  email: {
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  },
  password: {
    required: true,
    minLength: 8,
    maxLength: 128,
    patterns: {
      lowercase: /(?=.*[a-z])/,
      uppercase: /(?=.*[A-Z])/,
      number: /(?=.*\d)/,
      special: /(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/
    }
  }
}

// Field validation functions
const validateFirstName = computed(() => {
  const value = firstName.value.trim()
  const errors = []
  
  if (!value && formTouched.value.firstName) {
    errors.push('First name is required')
  } else if (value) {
    if (value.length < validationRules.firstName.minLength) {
      errors.push(`First name must be at least ${validationRules.firstName.minLength} characters`)
    }
    if (value.length > validationRules.firstName.maxLength) {
      errors.push(`First name must be less than ${validationRules.firstName.maxLength} characters`)
    }
    if (!validationRules.firstName.pattern.test(value)) {
      errors.push('First name can only contain letters, spaces, apostrophes, and hyphens')
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
})

const validateLastName = computed(() => {
  const value = lastName.value.trim()
  const errors = []
  
  if (!value && formTouched.value.lastName) {
    errors.push('Last name is required')
  } else if (value) {
    if (value.length < validationRules.lastName.minLength) {
      errors.push(`Last name must be at least ${validationRules.lastName.minLength} characters`)
    }
    if (value.length > validationRules.lastName.maxLength) {
      errors.push(`Last name must be less than ${validationRules.lastName.maxLength} characters`)
    }
    if (!validationRules.lastName.pattern.test(value)) {
      errors.push('Last name can only contain letters, spaces, apostrophes, and hyphens')
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
})

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
    if (!validationRules.password.patterns.lowercase.test(value)) {
      errors.push('Password must contain at least one lowercase letter')
    }
    if (!validationRules.password.patterns.uppercase.test(value)) {
      errors.push('Password must contain at least one uppercase letter')
    }
    if (!validationRules.password.patterns.number.test(value)) {
      errors.push('Password must contain at least one number')
    }
    if (!validationRules.password.patterns.special.test(value)) {
      errors.push('Password must contain at least one special character')
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
})

const validateConfirmPassword = computed(() => {
  const value = confirmPassword.value
  const errors = []
  
  if (!value && formTouched.value.confirmPassword) {
    errors.push('Please confirm your password')
  } else if (value && value !== password.value) {
    errors.push('Passwords do not match')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
})

// Enhanced form validation
const isFormValid = computed(() => {
  return validateFirstName.value.isValid &&
         validateLastName.value.isValid &&
         validateEmail.value.isValid &&
         validatePassword.value.isValid &&
         validateConfirmPassword.value.isValid &&
         agreeToTerms.value
})

const passwordsMatch = computed(() => {
  return password.value === confirmPassword.value || confirmPassword.value === ''
})

const passwordStrength = computed(() => {
  const pw = password.value
  if (pw.length === 0) return 0
  
  let strength = 0
  if (pw.length >= 8) strength++
  if (validationRules.password.patterns.lowercase.test(pw)) strength++
  if (validationRules.password.patterns.uppercase.test(pw)) strength++
  if (validationRules.password.patterns.number.test(pw)) strength++
  if (validationRules.password.patterns.special.test(pw)) strength++
  
  return strength
})

const passwordStrengthLabel = computed(() => {
  const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong']
  return labels[passwordStrength.value]
})

const passwordStrengthColor = computed(() => {
  const colors = ['text-red-600', 'text-red-600', 'text-orange-600', 'text-yellow-600', 'text-green-600', 'text-green-600']
  return colors[passwordStrength.value]
})

// Touch handlers
const handleFieldBlur = (fieldName: string) => {
  formTouched.value[fieldName as keyof typeof formTouched.value] = true
  // Clear signup error when user starts interacting after an error
  if (signupError.value) {
    signupError.value = ''
  }
}

// Clear error when user types
const handleInputChange = () => {
  if (signupError.value) {
    signupError.value = ''
  }
}

// Handle form submission
const handleSignUp = async () => {
  // Mark all fields as touched for validation display
  Object.keys(formTouched.value).forEach(key => {
    formTouched.value[key as keyof typeof formTouched.value] = true
  })
  
  // Clear any previous signup errors
  signupError.value = ''
  
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
    // Prepare user data
    const userData = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      email: email.value.trim().toLowerCase(),
      password: password.value
    }
    
    // Use Appwrite authentication
    const { register } = useAuth()
    
    // Create account with Appwrite
    const fullName = `${userData.firstName} ${userData.lastName}`
    const registrationSuccess = await register({
      email: userData.email,
      password: userData.password,
      name: fullName
    })
    
    if (registrationSuccess) {
      // Clear form on success
      clearForm()
      
      // Redirect to login with success message
      await router.push('/login?message=Account created successfully! Please sign in with your credentials.')
    } else {
      // Handle registration failure
      throw new Error('Registration failed')
    }
  } catch (error: any) {
    console.error('Sign up error:', error)
    
    // Handle specific error cases
    signupError.value = getErrorMessage(error)
    
    // Focus back to first invalid field or email field for retry
    setTimeout(() => {
      const firstInvalidField = getFirstInvalidField()
      const fieldToFocus = firstInvalidField || 'email'
      document.getElementById(fieldToFocus)?.focus()
    }, 100)
    
    // TODO: Show error toast notification
    // useToast().add({ 
    //   title: 'Registration Failed',
    //   description: signupError.value,
    //   color: 'red'
    // })
  } finally {
    isLoading.value = false
  }
}

// Helper functions
const getFirstInvalidField = (): string | null => {
  if (!validateFirstName.value.isValid) return 'firstName'
  if (!validateLastName.value.isValid) return 'lastName'
  if (!validateEmail.value.isValid) return 'email'
  if (!validatePassword.value.isValid) return 'password'
  if (!validateConfirmPassword.value.isValid) return 'confirmPassword'
  if (!agreeToTerms.value) return 'agree-terms'
  return null
}

const getErrorMessage = (error: any): string => {
  if (error?.message) {
    // Handle specific Appwrite error messages
    if (error.message.includes('user_already_exists') || error.message.includes('email')) {
      return 'This email address is already registered. Please use a different email or sign in instead.'
    }
    if (error.message.includes('password') || error.message.includes('Password')) {
      return 'Password does not meet security requirements. Please ensure it meets all criteria.'
    }
    if (error.message.includes('user_invalid') || error.message.includes('invalid')) {
      return 'Invalid registration data. Please check your information and try again.'
    }
    if (error.message.includes('network') || error.message.includes('Network')) {
      return 'Network error. Please check your internet connection and try again.'
    }
    if (error.message.includes('rate') || error.message.includes('Rate')) {
      return 'Too many registration attempts. Please wait a moment and try again.'
    }
    // Return the original error message if it's user-friendly
    return error.message
  }
  return 'An unexpected error occurred during registration. Please try again.'
}

const clearForm = () => {
  firstName.value = ''
  lastName.value = ''
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
  agreeToTerms.value = false
  showPassword.value = false
  showConfirmPassword.value = false
  signupError.value = ''
  
  // Reset touch states
  Object.keys(formTouched.value).forEach(key => {
    formTouched.value[key as keyof typeof formTouched.value] = false
  })
}

// Handle Google sign up
const handleGoogleSignUp = () => {
  signupWithGoogle()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Left side - Gradient with quote (hidden on mobile) -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-800 via-blue-700 to-cyan-700">
        <!-- Animated gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-blue-300/20 to-cyan-400/20 animate-pulse"></div>
        
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
          <p class="text-sm font-medium tracking-wider opacity-80">BEGIN YOUR SUCCESS STORY</p>
        </div>
        
        <div class="space-y-6">
          <h1 class="text-5xl font-bold leading-tight">
            Ace Every<br>
            Technical<br>
            Interview
          </h1>
          <p class="text-lg opacity-90 max-w-md">
            Join thousands of developers who've landed their dream jobs. Get personalized coaching, practice coding problems, and build confidence.
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

    <!-- Right side - Signup form -->
    <div class="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-8">
      <div class="w-full max-w-md mx-auto">
        <!-- Loading state while checking authentication -->
        <div v-if="isCheckingAuth" class="text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 class="text-lg font-medium text-gray-900 mb-2">Checking Authentication...</h2>
          <p class="text-sm text-gray-600">Please wait while we verify your session</p>
        </div>

        <!-- Signup form (only shown when not checking auth) -->
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
            <h2 class="text-3xl font-bold text-gray-900">Create Account</h2>
            <p class="mt-2 text-gray-600">Join TechTerview and start preparing for your dream job</p>
          </div>

          <!-- Signup Error Alert -->
          <div v-if="signupError" class="mb-6">
            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
              <div class="flex items-center">
                <Icon name="heroicons:exclamation-triangle" class="w-5 h-5 text-red-500 mr-3" />
                <p class="text-sm text-red-800">{{ signupError }}</p>
              </div>
            </div>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSignUp" class="space-y-6">
            <!-- Name fields -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                  First Name <span class="text-red-500">*</span>
                </label>
                <UInput
                  id="firstName"
                  v-model="firstName"
                  type="text"
                  placeholder="First name"
                  size="lg"
                  :disabled="isLoading"
                  :color="!validateFirstName.isValid && formTouched.firstName ? 'error' : undefined"
                  class="w-full"
                  autocomplete="given-name"
                  required
                  @blur="handleFieldBlur('firstName')"
                  @input="handleInputChange"
                />
                <div v-if="!validateFirstName.isValid && formTouched.firstName" class="mt-1">
                  <p v-for="error in validateFirstName.errors" :key="error" class="text-xs text-red-600">
                    {{ error }}
                  </p>
                </div>
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                  Last Name <span class="text-red-500">*</span>
                </label>
                <UInput
                  id="lastName"
                  v-model="lastName"
                  type="text"
                  placeholder="Last name"
                  size="lg"
                  :disabled="isLoading"
                  :color="!validateLastName.isValid && formTouched.lastName ? 'error' : undefined"
                  class="w-full"
                  autocomplete="family-name"
                  required
                  @blur="handleFieldBlur('lastName')"
                  @input="handleInputChange"
                />
                <div v-if="!validateLastName.isValid && formTouched.lastName" class="mt-1">
                  <p v-for="error in validateLastName.errors" :key="error" class="text-xs text-red-600">
                    {{ error }}
                  </p>
                </div>
              </div>
            </div>

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
                :disabled="isLoading"
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
                  placeholder="Create a password"
                  size="lg"
                  :disabled="isLoading"
                  :color="!validatePassword.isValid && formTouched.password ? 'error' : undefined"
                  class="w-full pr-12"
                  autocomplete="new-password"
                  required
                  @blur="handleFieldBlur('password')"
                  @input="handleInputChange"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  :disabled="isLoading"
                >
                  <Icon 
                    :name="showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" 
                    class="w-5 h-5"
                  />
                </button>
              </div>
              
              <!-- Password validation errors -->
              <div v-if="!validatePassword.isValid && formTouched.password" class="mt-1">
                <p v-for="error in validatePassword.errors" :key="error" class="text-xs text-red-600">
                  {{ error }}
                </p>
              </div>
              
              <!-- Password strength indicator -->
              <div v-if="password.length > 0" class="mt-2">
                <div class="flex items-center space-x-2">
                  <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      class="h-full transition-all duration-300"
                      :class="{
                        'bg-red-500': passwordStrength <= 2,
                        'bg-orange-500': passwordStrength === 3,
                        'bg-yellow-500': passwordStrength === 4,
                        'bg-green-500': passwordStrength === 5
                      }"
                      :style="{ width: `${(passwordStrength / 5) * 100}%` }"
                    ></div>
                  </div>
                  <span 
                    class="text-xs font-medium"
                    :class="passwordStrengthColor"
                  >
                    {{ passwordStrengthLabel }}
                  </span>
                </div>
                
                <!-- Password requirements checklist -->
                <div class="mt-2 space-y-1">
                  <div class="flex items-center space-x-2">
                    <Icon 
                      :name="password.length >= 8 ? 'heroicons:check-circle' : 'heroicons:x-circle'" 
                      :class="password.length >= 8 ? 'text-green-500' : 'text-gray-400'"
                      class="w-3 h-3"
                    />
                    <span class="text-xs" :class="password.length >= 8 ? 'text-green-600' : 'text-gray-500'">
                      At least 8 characters
                    </span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <Icon 
                      :name="validationRules.password.patterns.lowercase.test(password) ? 'heroicons:check-circle' : 'heroicons:x-circle'" 
                      :class="validationRules.password.patterns.lowercase.test(password) ? 'text-green-500' : 'text-gray-400'"
                      class="w-3 h-3"
                    />
                    <span class="text-xs" :class="validationRules.password.patterns.lowercase.test(password) ? 'text-green-600' : 'text-gray-500'">
                      One lowercase letter
                    </span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <Icon 
                      :name="validationRules.password.patterns.uppercase.test(password) ? 'heroicons:check-circle' : 'heroicons:x-circle'" 
                      :class="validationRules.password.patterns.uppercase.test(password) ? 'text-green-500' : 'text-gray-400'"
                      class="w-3 h-3"
                    />
                    <span class="text-xs" :class="validationRules.password.patterns.uppercase.test(password) ? 'text-green-600' : 'text-gray-500'">
                      One uppercase letter
                    </span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <Icon 
                      :name="validationRules.password.patterns.number.test(password) ? 'heroicons:check-circle' : 'heroicons:x-circle'" 
                      :class="validationRules.password.patterns.number.test(password) ? 'text-green-500' : 'text-gray-400'"
                      class="w-3 h-3"
                    />
                    <span class="text-xs" :class="validationRules.password.patterns.number.test(password) ? 'text-green-600' : 'text-gray-500'">
                      One number
                    </span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <Icon 
                      :name="validationRules.password.patterns.special.test(password) ? 'heroicons:check-circle' : 'heroicons:x-circle'" 
                      :class="validationRules.password.patterns.special.test(password) ? 'text-green-500' : 'text-gray-400'"
                      class="w-3 h-3"
                    />
                    <span class="text-xs" :class="validationRules.password.patterns.special.test(password) ? 'text-green-600' : 'text-gray-500'">
                      One special character
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Confirm Password field -->
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <UInput
                  id="confirmPassword"
                  v-model="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Confirm your password"
                  size="lg"
                  :disabled="isLoading"
                  :color="!validateConfirmPassword.isValid && formTouched.confirmPassword ? 'error' : undefined"
                  class="w-full pr-12"
                  autocomplete="new-password"
                  required
                  @blur="handleFieldBlur('confirmPassword')"
                  @input="handleInputChange"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  :disabled="isLoading"
                >
                  <Icon 
                    :name="showConfirmPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" 
                    class="w-5 h-5"
                  />
                </button>
              </div>
              
              <!-- Password match indicator -->
              <div v-if="confirmPassword.length > 0" class="mt-1 flex items-center space-x-2">
                <Icon 
                  :name="passwordsMatch ? 'heroicons:check-circle' : 'heroicons:x-circle'" 
                  :class="passwordsMatch ? 'text-green-500' : 'text-red-500'"
                  class="w-4 h-4"
                />
                <span 
                  class="text-xs"
                  :class="passwordsMatch ? 'text-green-600' : 'text-red-600'"
                >
                  {{ passwordsMatch ? 'Passwords match' : 'Passwords do not match' }}
                </span>
              </div>
              
              <div v-if="!validateConfirmPassword.isValid && formTouched.confirmPassword" class="mt-1">
                <p v-for="error in validateConfirmPassword.errors" :key="error" class="text-xs text-red-600">
                  {{ error }}
                </p>
              </div>
            </div>

            <!-- Terms and conditions -->
            <div class="space-y-2">
              <div class="flex items-start">
                <UCheckbox
                  id="agree-terms"
                  v-model="agreeToTerms"
                  :disabled="isLoading"
                  class="mt-1"
                />
                <label for="agree-terms" class="ml-2 text-sm text-gray-600">
                  I agree to the 
                  <NuxtLink to="/legal/terms" class="text-blue-600 hover:text-blue-700 font-medium">
                    Terms of Service
                  </NuxtLink>
                  and
                  <NuxtLink to="/legal/privacy" class="text-blue-600 hover:text-blue-700 font-medium">
                    Privacy Policy
                  </NuxtLink>
                  <span class="text-red-500">*</span>
                </label>
              </div>
              <p v-if="Object.values(formTouched).some(Boolean) && !agreeToTerms" class="text-xs text-red-600 ml-6">
                You must agree to the Terms of Service and Privacy Policy to continue
              </p>
            </div>

            <!-- Sign up button -->
            <UButton
              type="submit"
              size="lg"
              :loading="isLoading"
              :disabled="!isFormValid || isLoading"
              class="w-full bg-primary hover:bg-blue-800 text-white mb-2"
              block
            >
              {{ isLoading ? 'Creating Account...' : 'Create Account' }}
            </UButton>

            <!-- Google sign up -->
            <UButton
              type="button"
              variant="outline"
              size="lg"
              @click="handleGoogleSignUp"
              :disabled="isLoading"
              class="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
              block
            >
              <template #leading>
                <Icon name="logos:google-icon" class="w-5 h-5" />
              </template>
              Sign Up with Google
            </UButton>
          </form>

          <!-- Sign in link -->
          <div class="text-center">
            <p class="text-sm text-gray-600">
              Already have an account?
              <NuxtLink
                to="/login"
                class="font-medium text-blue-600 hover:text-blue-700 ml-1"
              >
                Sign In
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

/* Custom password strength colors */
.text-red-600 { color: #dc2626; }
.text-orange-600 { color: #ea580c; }
.text-yellow-600 { color: #d97706; }
.text-green-600 { color: #16a34a; }
</style>