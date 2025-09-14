<script setup lang="ts">
// Set page head metadata
useHead({
  title: 'Privacy Policy - TechTerview',
  meta: [
    {
      name: 'description',
      content: 'Learn how TechTerview collects, uses, and protects your personal information in our comprehensive Privacy Policy.'
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
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p class="text-lg text-gray-600">
            Last updated: {{ new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
          </p>
        </div>

        <!-- Content -->
        <div class="prose prose-lg max-w-none">
          <!-- Introduction -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p class="text-gray-700 leading-relaxed">
              TechTerview ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered interview preparation platform.
            </p>
            <p class="text-gray-700 leading-relaxed mt-4">
              Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access or use the service.
            </p>
          </section>

          <!-- Information We Collect -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            
            <h3 class="text-xl font-medium text-gray-900 mb-3">Personal Information</h3>
            <p class="text-gray-700 leading-relaxed mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul class="list-disc pl-6 space-y-3 text-gray-700">
              <li>Register for an account</li>
              <li>Use our interview preparation services</li>
              <li>Contact us for support</li>
              <li>Subscribe to our newsletter</li>
              <li>Participate in surveys or feedback forms</li>
            </ul>
            
            <p class="text-gray-700 leading-relaxed mt-4">This information may include:</p>
            <ul class="list-disc pl-6 space-y-2 text-gray-700 mt-2">
              <li>Name and contact information (email address, phone number)</li>
              <li>Account credentials (username, password)</li>
              <li>Professional information (job title, company, experience level)</li>
              <li>Interview responses and practice session data</li>
              <li>Payment information (processed securely through third-party providers)</li>
            </ul>

            <h3 class="text-xl font-medium text-gray-900 mb-3 mt-6">Automatically Collected Information</h3>
            <p class="text-gray-700 leading-relaxed mb-4">
              We automatically collect certain information when you visit, use, or navigate our service:
            </p>
            <ul class="list-disc pl-6 space-y-2 text-gray-700">
              <li>Device and browser information</li>
              <li>IP address and location data</li>
              <li>Usage patterns and preferences</li>
              <li>Performance analytics and error logs</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <!-- How We Use Your Information -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul class="list-disc pl-6 space-y-3 text-gray-700">
              <li>Provide, maintain, and improve our AI-powered interview preparation services</li>
              <li>Create and manage your account</li>
              <li>Personalize your learning experience and provide tailored recommendations</li>
              <li>Process payments and manage subscriptions</li>
              <li>Send you important updates, notifications, and support communications</li>
              <li>Analyze usage patterns to enhance our platform's effectiveness</li>
              <li>Ensure security and prevent fraud</li>
              <li>Comply with legal obligations and resolve disputes</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>
          </section>

          <!-- AI and Machine Learning -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">4. AI and Machine Learning</h2>
            <p class="text-gray-700 leading-relaxed">
              TechTerview uses artificial intelligence and machine learning technologies to provide personalized interview coaching and feedback. This includes:
            </p>
            <ul class="list-disc pl-6 space-y-3 text-gray-700 mt-4">
              <li>Analyzing your interview responses to provide constructive feedback</li>
              <li>Identifying areas for improvement based on your performance</li>
              <li>Generating personalized practice questions and scenarios</li>
              <li>Tracking your progress and suggesting optimal learning paths</li>
            </ul>
            <p class="text-gray-700 leading-relaxed mt-4">
              Your interview data is used to train and improve our AI models while maintaining your privacy through data anonymization and aggregation techniques.
            </p>
          </section>

          <!-- Information Sharing -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">5. How We Share Your Information</h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
            </p>
            
            <h3 class="text-xl font-medium text-gray-900 mb-3">Service Providers</h3>
            <p class="text-gray-700 leading-relaxed mb-4">
              We may share your information with trusted third-party service providers who assist us in:
            </p>
            <ul class="list-disc pl-6 space-y-2 text-gray-700">
              <li>Payment processing</li>
              <li>Data analytics and insights</li>
              <li>Customer support services</li>
              <li>Cloud hosting and storage</li>
              <li>Email and communication services</li>
            </ul>

            <h3 class="text-xl font-medium text-gray-900 mb-3 mt-6">Legal Requirements</h3>
            <p class="text-gray-700 leading-relaxed">
              We may disclose your information if required by law, regulation, legal process, or governmental request, or to protect our rights, users, or the public.
            </p>
          </section>

          <!-- Data Security -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">6. Data Security</h2>
            <p class="text-gray-700 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul class="list-disc pl-6 space-y-3 text-gray-700 mt-4">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Employee training on data protection practices</li>
              <li>Secure development and deployment practices</li>
            </ul>
            <p class="text-gray-700 leading-relaxed mt-4">
              However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.
            </p>
          </section>

          <!-- Your Privacy Rights -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">7. Your Privacy Rights</h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul class="list-disc pl-6 space-y-3 text-gray-700">
              <li><strong>Access:</strong> Request access to your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Request a copy of your data in a structured format</li>
              <li><strong>Restriction:</strong> Request restriction of processing your information</li>
              <li><strong>Objection:</strong> Object to processing of your information</li>
              <li><strong>Withdrawal:</strong> Withdraw consent for processing (where applicable)</li>
            </ul>
            <p class="text-gray-700 leading-relaxed mt-4">
              To exercise these rights, please contact us using the information provided at the end of this policy.
            </p>
          </section>

          <!-- Cookies and Tracking -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">8. Cookies and Tracking Technologies</h2>
            <p class="text-gray-700 leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience on our platform. These technologies help us:
            </p>
            <ul class="list-disc pl-6 space-y-3 text-gray-700 mt-4">
              <li>Remember your preferences and settings</li>
              <li>Analyze site traffic and usage patterns</li>
              <li>Provide personalized content and recommendations</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
            <p class="text-gray-700 leading-relaxed mt-4">
              You can control cookies through your browser settings, but disabling certain cookies may limit some functionality of our service.
            </p>
          </section>

          <!-- Data Retention -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">9. Data Retention</h2>
            <p class="text-gray-700 leading-relaxed">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. We will delete or anonymize your information when it is no longer needed.
            </p>
            <p class="text-gray-700 leading-relaxed mt-4">
              Interview practice data may be retained longer for AI model improvement purposes, but will be anonymized to protect your privacy.
            </p>
          </section>

          <!-- International Transfers -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">10. International Data Transfers</h2>
            <p class="text-gray-700 leading-relaxed">
              Your information may be transferred to and processed in countries other than your country of residence. We ensure that such transfers are conducted in accordance with applicable data protection laws and implement appropriate safeguards to protect your information.
            </p>
          </section>

          <!-- Children's Privacy -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">11. Children's Privacy</h2>
            <p class="text-gray-700 leading-relaxed">
              Our service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.
            </p>
          </section>

          <!-- Changes to Privacy Policy -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
            <p class="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our website and updating the "Last updated" date.
            </p>
            <p class="text-gray-700 leading-relaxed mt-4">
              Your continued use of our service after the effective date of the updated policy constitutes your acceptance of the changes.
            </p>
          </section>

          <!-- Contact Information -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">13. Contact Us</h2>
            <p class="text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div class="mt-4 p-4 bg-gray-50 rounded-lg">
              <p class="text-gray-700 font-medium">Email: privacy@techterview.com</p>
              <p class="text-gray-700">Data Protection Officer: dpo@techterview.com</p>
              <p class="text-gray-700">Address: TechTerview Privacy Department</p>
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
            <NuxtLink to="/legal/terms" class="text-sm text-gray-600 hover:text-gray-900">
              Terms of Service
            </NuxtLink>
            <NuxtLink to="/legal/privacy" class="text-sm text-gray-600 hover:text-gray-900 font-medium">
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

.prose h3 {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.prose ul {
  margin: 1rem 0;
}

.prose li {
  margin: 0.5rem 0;
}

strong {
  font-weight: 600;
  color: #111827;
}
</style>