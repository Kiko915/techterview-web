<script setup lang="ts">
// Set page head metadata
useHead({
  title: 'TechTerview - AI-Powered Interview Preparation',
  meta: [
    {
      name: 'description',
      content: 'Master your next interview with AI-powered preparation platform designed for tech professionals. Practice coding interviews, behavioral questions, and system design.'
    },
    {
      name: 'keywords',
      content: 'interview preparation, coding interview, AI interview prep, tech interviews, software engineer interviews'
    },
    {
      property: 'og:title',
      content: 'TechTerview - AI-Powered Interview Preparation'
    },
    {
      property: 'og:description',
      content: 'Master your next interview with AI-powered preparation platform designed for tech professionals.'
    },
    {
      property: 'og:type',
      content: 'website'
    }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center items-center p-6">
    <div class="max-w-4xl w-full text-center space-y-8">
      <!-- Logo -->
      <div class="mb-12">
        <NuxtImg 
          src="/logo/techterview_wordmark_colored.png" 
          alt="TechTerview" 
          class="h-16 mx-auto"
          loading="eager"
        />
      </div>

      <!-- Header -->
      <div class="space-y-4">
        <h1 class="text-5xl font-bold text-gray-900 font-heading">
          Welcome to TechTerview
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Master your next interview with AI-powered preparation designed for tech professionals
        </p>
      </div>

      <!-- Action Cards -->
      <div class="grid md:grid-cols-2 gap-8 mt-12">
        <!-- Login Card -->
        <div class="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div class="space-y-4">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Icon name="heroicons:arrow-right-on-rectangle" class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900">Sign In</h3>
            <p class="text-gray-600">
              Already have an account? Access your personalized interview prep dashboard.
            </p>
            <NuxtLink
              to="/login"
              class="inline-flex items-center justify-center w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign In to Your Account
              <Icon name="heroicons:arrow-right" class="ml-2 w-5 h-5" />
            </NuxtLink>
          </div>
        </div>

        <!-- Signup Card -->
        <div class="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div class="space-y-4">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <Icon name="heroicons:user-plus" class="w-8 h-8 text-purple-600" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900">Get Started</h3>
            <p class="text-gray-600">
              New to TechTerview? Create your account and start preparing for your dream job.
            </p>
            <NuxtLink
              to="/signup"
              class="inline-flex items-center justify-center w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              Create Free Account
              <Icon name="heroicons:arrow-right" class="ml-2 w-5 h-5" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Features Preview -->
      <div class="mt-16 bg-white rounded-2xl shadow-xl p-8">
        <h3 class="text-2xl font-bold text-gray-900 mb-6">What You'll Get</h3>
        <div class="grid md:grid-cols-3 gap-6 text-left">
          <div class="flex items-start space-x-3">
            <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="heroicons:check" class="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 class="font-semibold text-gray-900">AI-Powered Practice</h4>
              <p class="text-sm text-gray-600">Get personalized interview questions based on your role and experience</p>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="heroicons:check" class="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 class="font-semibold text-gray-900">Real-time Feedback</h4>
              <p class="text-sm text-gray-600">Receive instant feedback on your answers and communication skills</p>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="heroicons:check" class="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 class="font-semibold text-gray-900">Progress Tracking</h4>
              <p class="text-sm text-gray-600">Monitor your improvement and identify areas for growth</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-12 text-center text-gray-500">
        <p>&copy; 2025 TechTerview. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>