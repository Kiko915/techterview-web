<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

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

// Router for navigation
const router = useRouter()

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

// Form validation
const isFormValid = computed(() => {
  return firstName.value.length > 0 && 
         lastName.value.length > 0 &&
         email.value.includes('@') && 
         password.value.length >= 8 && 
         password.value === confirmPassword.value &&
         agreeToTerms.value
})

const passwordsMatch = computed(() => {
  return password.value === confirmPassword.value || confirmPassword.value === ''
})

const passwordStrength = computed(() => {
  const pw = password.value
  if (pw.length === 0) return 0
  if (pw.length < 6) return 1
  if (pw.length < 8 || !/(?=.*[a-z])(?=.*[A-Z])/.test(pw)) return 2
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(pw)) return 3
  return 4
})

const passwordStrengthLabel = computed(() => {
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  return labels[passwordStrength.value]
})

const passwordStrengthColor = computed(() => {
  const colors = ['', 'red', 'orange', 'yellow', 'green']
  return colors[passwordStrength.value]
})

// Handle form submission
const handleSignUp = async () => {
  if (!isFormValid.value) return
  
  isLoading.value = true
  
  try {
    // TODO: Implement actual registration logic
    console.log('Sign up:', { 
      firstName: firstName.value, 
      lastName: lastName.value,
      email: email.value, 
      password: password.value 
    })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Redirect after successful registration
    await router.push('/login?message=Account created successfully')
  } catch (error) {
    console.error('Sign up error:', error)
  } finally {
    isLoading.value = false
  }
}

// Handle Google sign up
const handleGoogleSignUp = () => {
  // TODO: Implement Google OAuth
  console.log('Google sign up')
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
    <div class="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16">
      <div class="w-full max-w-md mx-auto">
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

          <!-- Form -->
          <form @submit.prevent="handleSignUp" class="space-y-6">
            <!-- Name fields -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <UInput
                  id="firstName"
                  v-model="firstName"
                  type="text"
                  placeholder="First name"
                  size="lg"
                  :disabled="isLoading"
                  class="w-full"
                  autocomplete="given-name"
                  required
                />
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <UInput
                  id="lastName"
                  v-model="lastName"
                  type="text"
                  placeholder="Last name"
                  size="lg"
                  :disabled="isLoading"
                  class="w-full"
                  autocomplete="family-name"
                  required
                />
              </div>
            </div>

            <!-- Email field -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <UInput
                id="email"
                v-model="email"
                type="email"
                placeholder="Enter your email"
                size="lg"
                :disabled="isLoading"
                class="w-full"
                autocomplete="email"
                required
              />
            </div>

            <!-- Password field -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div class="relative">
                <UInput
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Create a password"
                  size="lg"
                  :disabled="isLoading"
                  class="w-full pr-12"
                  autocomplete="new-password"
                  required
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
              
              <!-- Password strength indicator -->
              <div v-if="password.length > 0" class="mt-2">
                <div class="flex items-center space-x-2">
                  <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      class="h-full transition-all duration-300"
                      :class="{
                        'bg-red-500': passwordStrength === 1,
                        'bg-orange-500': passwordStrength === 2,
                        'bg-yellow-500': passwordStrength === 3,
                        'bg-green-500': passwordStrength === 4
                      }"
                      :style="{ width: `${(passwordStrength / 4) * 100}%` }"
                    ></div>
                  </div>
                  <span 
                    class="text-xs font-medium"
                    :class="`text-${passwordStrengthColor}-600`"
                  >
                    {{ passwordStrengthLabel }}
                  </span>
                </div>
                <p class="text-xs text-gray-500 mt-1">
                  Use 8+ characters with letters, numbers, and symbols
                </p>
              </div>
            </div>

            <!-- Confirm Password field -->
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div class="relative">
                <UInput
                  id="confirmPassword"
                  v-model="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Confirm your password"
                  size="lg"
                  :disabled="isLoading"
                  class="w-full pr-12"
                  :class="{ 'border-red-300': confirmPassword.length > 0 && !passwordsMatch }"
                  autocomplete="new-password"
                  required
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
              <p v-if="confirmPassword.length > 0 && !passwordsMatch" class="text-xs text-red-600 mt-1">
                Passwords don't match
              </p>
            </div>

            <!-- Terms and conditions -->
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
              </label>
            </div>

            <!-- Sign up button -->
            <UButton
              type="submit"
              size="lg"
              :loading="isLoading"
              :disabled="!isFormValid || isLoading"
              class="w-full bg-black hover:bg-gray-800 text-white mb-2"
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