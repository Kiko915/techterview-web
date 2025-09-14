<script setup lang="ts">
// Set page head metadata
useHead({
  title: 'Terms of Service - TechTerview',
  meta: [
    {
      name: 'description',
      content: 'Read TechTerview\'s Terms of Service to understand your rights and responsibilities when using our AI-powered interview preparation platform.'
    }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-4xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <NuxtImg 
              src="/logo/techterview_wordmark_colored.png" 
              alt="TechTerview" 
              class="h-8"
              loading="eager"
            />
          </NuxtLink>
          <NuxtLink 
            to="/login" 
            class="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Back to Login
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-6 py-12">
      <div class="bg-white rounded-lg shadow-sm p-8 lg:p-12">
        <!-- Page Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p class="text-lg text-gray-600">
            Last updated: {{ new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
          </p>
        </div>

        <!-- Content -->
        <div class="prose prose-lg max-w-none">
          <!-- Introduction -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p class="text-gray-700 leading-relaxed">
              By accessing and using TechTerview ("we," "our," or "us"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
            <p class="text-gray-700 leading-relaxed mt-4">
              TechTerview is an AI-powered interview preparation platform designed to help users improve their technical interview skills through personalized coaching, practice problems, and real-time feedback.
            </p>
          </section>

          <!-- Account Terms -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">2. Account Terms</h2>
            <ul class="list-disc pl-6 space-y-3 text-gray-700">
              <li>You must be 13 years or older to use this service.</li>
              <li>You must provide a valid email address and any other information requested in order to complete the signup process.</li>
              <li>You are responsible for maintaining the security of your account and password.</li>
              <li>You may not use the service for any illegal or unauthorized purpose.</li>
              <li>You must not transmit any worms or viruses or any code of a destructive nature.</li>
            </ul>
          </section>

          <!-- Service Description -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">3. Service Description</h2>
            <p class="text-gray-700 leading-relaxed">
              TechTerview provides:
            </p>
            <ul class="list-disc pl-6 space-y-3 text-gray-700 mt-4">
              <li>AI-powered interview preparation and coaching</li>
              <li>Technical coding challenges and practice problems</li>
              <li>Real-time feedback and performance analytics</li>
              <li>Mock interview sessions and behavioral question practice</li>
              <li>Progress tracking and personalized learning paths</li>
            </ul>
            <p class="text-gray-700 leading-relaxed mt-4">
              We reserve the right to modify, suspend, or discontinue the service (or any part thereof) at any time with or without notice to you.
            </p>
          </section>

          <!-- User Content -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">4. User Content</h2>
            <p class="text-gray-700 leading-relaxed">
              You retain ownership of any intellectual property rights that you hold in content that you submit to TechTerview ("User Content"). However, by submitting User Content to TechTerview, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute such content in connection with providing the service.
            </p>
            <p class="text-gray-700 leading-relaxed mt-4">
              You represent and warrant that you own or have the necessary licenses, rights, consents, and permissions to use and authorize us to use all User Content as described herein.
            </p>
          </section>

          <!-- Prohibited Uses -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">5. Prohibited Uses</h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              You may not use our service:
            </p>
            <ul class="list-disc pl-6 space-y-3 text-gray-700">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload or transmit viruses or any other type of malicious code</li>
              <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
              <li>For any obscene or immoral purpose</li>
            </ul>
          </section>

          <!-- Payment Terms -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">6. Payment Terms</h2>
            <p class="text-gray-700 leading-relaxed">
              Some aspects of TechTerview may require payment. You agree to provide current, complete, and accurate purchase and account information for all purchases made through the service.
            </p>
            <p class="text-gray-700 leading-relaxed mt-4">
              All fees are non-refundable unless otherwise stated. We reserve the right to change our pricing at any time with reasonable notice.
            </p>
          </section>

          <!-- Intellectual Property -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
            <p class="text-gray-700 leading-relaxed">
              The service and its original content, features, and functionality are and will remain the exclusive property of TechTerview and its licensors. The service is protected by copyright, trademark, and other laws.
            </p>
          </section>

          <!-- Disclaimers -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">8. Disclaimers</h2>
            <p class="text-gray-700 leading-relaxed">
              The information on this service is provided on an "as is" basis. To the fullest extent permitted by law, TechTerview excludes all representations, warranties, conditions and terms whether express or implied.
            </p>
            <p class="text-gray-700 leading-relaxed mt-4">
              TechTerview shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <!-- Privacy Policy -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">9. Privacy Policy</h2>
            <p class="text-gray-700 leading-relaxed">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.
            </p>
          </section>

          <!-- Termination -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">10. Termination</h2>
            <p class="text-gray-700 leading-relaxed">
              We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>

          <!-- Changes to Terms -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">11. Changes to Terms</h2>
            <p class="text-gray-700 leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>
          </section>

          <!-- Contact Information -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
            <p class="text-gray-700 leading-relaxed">
              Questions about the Terms of Service should be sent to us at:
            </p>
            <div class="mt-4 p-4 bg-gray-50 rounded-lg">
              <p class="text-gray-700 font-medium">Email: legal@techterview.com</p>
              <p class="text-gray-700">Address: TechTerview Legal Department</p>
            </div>
          </section>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-200 bg-white">
      <div class="max-w-4xl mx-auto px-6 py-8">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="flex items-center space-x-6">
            <NuxtLink to="/legal/terms" class="text-sm text-gray-600 hover:text-gray-900 font-medium">
              Terms of Service
            </NuxtLink>
            <NuxtLink to="/legal/privacy" class="text-sm text-gray-600 hover:text-gray-900">
              Privacy Policy
            </NuxtLink>
          </div>
          <p class="text-sm text-gray-500">
            © {{ new Date().getFullYear() }} TechTerview. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.prose h2 {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

.prose ul {
  margin: 1rem 0;
}

.prose li {
  margin: 0.5rem 0;
}
</style>