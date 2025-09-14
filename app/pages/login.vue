<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

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

// Router for navigation
const router = useRouter()

// Form state
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const isLoading = ref(false)

// Form validation
const isFormValid = computed(() => {
  return email.value.includes('@') && password.value.length >= 6
})

// Handle form submission
const handleSignIn = async () => {
  if (!isFormValid.value) return
  
  isLoading.value = true
  
  try {
    // TODO: Implement actual authentication logic
    console.log('Sign in:', { email: email.value, password: password.value, rememberMe: rememberMe.value })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirect after successful login
    await router.push('/dashboard')
  } catch (error) {
    console.error('Sign in error:', error)
  } finally {
    isLoading.value = false
  }
}

// Handle Google sign in
const handleGoogleSignIn = () => {
  // TODO: Implement Google OAuth
  console.log('Google sign in')
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

          <!-- Form -->
          <form @submit.prevent="handleSignIn" class="space-y-6">
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
                  placeholder="Enter your password"
                  size="lg"
                  :disabled="isLoading"
                  class="w-full pr-12"
                  autocomplete="current-password"
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
            </div>

            <!-- Remember me and Forgot password -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <UCheckbox
                  id="remember-me"
                  v-model="rememberMe"
                  :disabled="isLoading"
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
              :disabled="!isFormValid || isLoading"
              class="w-full bg-black hover:bg-gray-800 text-white mb-2"
              block
            >
              Sign In
            </UButton>

            <!-- Google sign in -->
            <UButton
              type="button"
              variant="outline"
              size="lg"
              @click="handleGoogleSignIn"
              :disabled="isLoading"
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