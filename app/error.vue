<script setup lang="ts">
// Get the error object from Nuxt
const error = useError()

// Set page head metadata based on error type
useHead({
  title: computed(() => {
    if (error.value?.statusCode === 404) {
      return '404 - Page Not Found | TechTerview'
    }
    return `${error.value?.statusCode || 'Error'} - Something went wrong | TechTerview`
  }),
  meta: [
    {
      name: 'description',
      content: computed(() => {
        if (error.value?.statusCode === 404) {
          return 'The page you are looking for could not be found. Return to TechTerview to continue your interview preparation journey.'
        }
        return 'An error occurred while loading the page. Please try again or contact support if the problem persists.'
      })
    }
  ]
})

// Handle error clearing
const handleErrorClear = async () => {
  await clearError({ redirect: '/' })
}

// Go back function
const goBack = () => {
  if (window.history.length > 1) {
    window.history.back()
  } else {
    navigateTo('/')
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Error Content -->
    <div class="w-full flex flex-col justify-center px-6 sm:px-12 lg:px-16">
      <div class="w-full max-w-md mx-auto text-center">
        <!-- Logo -->
        <div class="mb-8">
          <NuxtImg 
            src="/logo/techterview_wordmark_colored.png" 
            alt="TechTerview" 
            class="h-10 mx-auto"
            loading="eager"
          />
        </div>

        <!-- Error Content -->
        <div class="space-y-8">
          <!-- Error Icon and Code -->
          <div class="space-y-4">
            <div class="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <Icon 
                :name="error?.statusCode === 404 ? 'heroicons:exclamation-triangle' : 'heroicons:exclamation-circle'" 
                class="w-12 h-12 text-blue-600" 
              />
            </div>
            <div>
              <h1 class="text-6xl font-bold text-gray-900 mb-2">
                {{ error?.statusCode || '500' }}
              </h1>
              <h2 class="text-2xl font-semibold text-gray-800">
                <template v-if="error?.statusCode === 404">
                  Page Not Found
                </template>
                <template v-else-if="error?.statusCode === 500">
                  Internal Server Error
                </template>
                <template v-else>
                  Something Went Wrong
                </template>
              </h2>
            </div>
          </div>

          <!-- Error Message -->
          <div class="space-y-4">
            <p class="text-gray-600 text-lg">
              <template v-if="error?.statusCode === 404">
                Looks like this page took a detour during deployment.
              </template>
              <template v-else>
                {{ error?.statusMessage || 'An unexpected error occurred while processing your request.' }}
              </template>
            </p>
            <p class="text-gray-500">
              <template v-if="error?.statusCode === 404">
                The page you're looking for doesn't exist or has been moved to a new location.
              </template>
              <template v-else>
                Our team has been notified and is working to fix this issue. Please try again in a few moments.
              </template>
            </p>
          </div>

          <!-- Technical Details (only in development) -->
          <div v-if="$config.public.dev && error?.stack" class="mt-6 p-4 bg-gray-100 rounded-lg text-left">
            <details>
              <summary class="cursor-pointer text-sm font-medium text-gray-700 mb-2">
                Technical Details (Dev Mode)
              </summary>
              <pre class="text-xs text-gray-600 overflow-auto max-h-32">{{ error.stack }}</pre>
            </details>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-4">
            <!-- Primary Action -->
            <button
              @click="handleErrorClear"
              class="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              <Icon name="heroicons:home" class="mr-2 w-5 h-5" />
              Back to Home
            </button>

            <!-- Secondary Actions -->
            <div class="grid grid-cols-2 gap-3">
              <button
                @click="goBack"
                class="inline-flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-md hover:border-gray-400"
              >
                <Icon name="heroicons:arrow-left" class="mr-2 w-4 h-4" />
                Go Back
              </button>
              <button
                @click="$router.go(0)"
                class="inline-flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-md hover:border-gray-400"
              >
                <Icon name="heroicons:arrow-path" class="mr-2 w-4 h-4" />
                Retry
              </button>
            </div>
          </div>

          <!-- Help Section -->
          <div class="mt-8 pt-8 border-t border-gray-200">
            <p class="text-sm text-gray-500 mb-4">
              Still having trouble?
            </p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <NuxtLink
                to="/login"
                class="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <Icon name="heroicons:arrow-right-on-rectangle" class="mr-1 w-4 h-4" />
                Sign In
              </NuxtLink>
              <span class="hidden sm:block text-gray-300">|</span>
              <NuxtLink
                to="/signup"
                class="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <Icon name="heroicons:user-plus" class="mr-1 w-4 h-4" />
                Sign Up
              </NuxtLink>
              <span class="hidden sm:block text-gray-300">|</span>
              <a 
                href="mailto:support@techterview.com" 
                class="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <Icon name="heroicons:envelope" class="mr-1 w-4 h-4" />
                Contact Support
              </a>
            </div>
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

/* Hover animations for buttons */
.hover\:scale-\[1\.02\]:hover {
  transform: scale(1.02);
}

.active\:scale-\[0\.98\]:active {
  transform: scale(0.98);
}

/* Ensure proper responsive behavior */
@media (max-width: 1023px) {
  .min-h-screen {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}
</style>