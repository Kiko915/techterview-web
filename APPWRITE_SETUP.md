# TechTerview Appwrite Setup Guide

## 🚀 Setup Complete!

Your TechTerview project has been successfully configured with Appwrite as the Backend-as-a-Service (BaaS). Here's what has been set up:

## ✅ What's Installed

### 1. Appwrite SDK
- **Package**: `appwrite@18.1.1`
- **Location**: Added to `package.json`

### 2. Configuration Files
- **Utils**: `utils/appwrite.ts` - Client configuration and service initialization
- **Plugin**: `plugins/appwrite.client.ts` - Nuxt plugin for automatic initialization
- **Environment**: `.env` and `.env.example` - Environment variables
- **Config**: `nuxt.config.ts` - Runtime configuration

### 3. Composables
- **useAuth**: `composables/useAuth.ts` - Authentication management
- **useDatabase**: `composables/useDatabase.ts` - Database operations

### 4. TypeScript Types
- **Types**: `types/index.ts` - Complete type definitions for TechTerview models

## 🔧 Next Steps

### 1. Create Your Appwrite Project

1. Go to [Appwrite Console](https://cloud.appwrite.io/console)
2. Create a new project
3. Note down your Project ID

### 2. Add a Web Platform

1. In your project, go to "Settings" → "Platforms"
2. Add a new **Web App**
3. Set the hostname to `localhost` for development
4. For production, use your actual domain

### 3. Configure Environment Variables

Update your `.env` file with your actual Appwrite credentials:

```env
# Replace with your actual values
NUXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NUXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id-here

# You'll need to create these in Appwrite Console
NUXT_PUBLIC_APPWRITE_DATABASE_ID=your-database-id-here
NUXT_PUBLIC_APPWRITE_BUCKET_ID=your-bucket-id-here
```

### 4. Create Database Structure

In your Appwrite Console, create:

#### Database
1. Go to "Databases" → "Create Database"
2. Name it "techterview" or similar
3. Copy the Database ID to your `.env` file

#### Collections
Create these collections with the specified IDs:

1. **users** - User profiles and preferences
2. **interviews** - Interview sessions
3. **questions** - Interview questions library  
4. **responses** - User responses to questions
5. **sessions** - Active interview sessions

#### Storage Bucket
1. Go to "Storage" → "Create Bucket"
2. Name it "techterview-files"
3. Copy the Bucket ID to your `.env` file

## 🎯 Usage Examples

### Authentication

```typescript
// In your Vue component
<script setup>
const { login, register, logout, user, loading, error } = useAuth()

// Login user
const handleLogin = async () => {
  const success = await login({
    email: 'user@example.com',
    password: 'password123'
  })
  
  if (success) {
    // User is logged in
    navigateTo('/dashboard')
  }
}

// Register new user
const handleRegister = async () => {
  const success = await register({
    email: 'user@example.com',
    password: 'password123',
    name: 'John Doe'
  })
  
  if (success) {
    // User is registered and logged in
    navigateTo('/dashboard')
  }
}
</script>

<template>
  <div>
    <div v-if="user">
      Welcome {{ user.name }}!
      <button @click="logout">Logout</button>
    </div>
    <div v-else>
      <button @click="handleLogin" :disabled="loading">Login</button>
      <button @click="handleRegister" :disabled="loading">Register</button>
    </div>
    
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>
```

### Database Operations

```typescript
// In your Vue component
<script setup>
const { 
  createUserProfile, 
  getUserProfile, 
  createInterviewSession,
  getInterviewQuestions 
} = useDatabase()

// Create user profile
const createProfile = async () => {
  const profile = await createUserProfile({
    userId: user.value.$id,
    firstName: 'John',
    lastName: 'Doe',
    email: user.value.email,
    skills: ['JavaScript', 'Vue.js', 'Node.js'],
    experience: 'mid',
    // ... other profile data
  })
}

// Get interview questions
const questions = await getInterviewQuestions({
  type: ['technical', 'coding'],
  difficulty: ['medium'],
  category: ['frontend']
})
</script>
```

## 🔒 Security & Permissions

### Collection Permissions
In Appwrite Console, set up proper permissions for each collection:

1. **users**: 
   - Create: Any authenticated user
   - Read: User can read own profile
   - Update: User can update own profile
   - Delete: Admin only

2. **interviews**: 
   - Create: Any authenticated user
   - Read: User can read own interviews
   - Update: User can update own interviews
   - Delete: User can delete own interviews

3. **questions**: 
   - Create: Admin only
   - Read: Any authenticated user
   - Update: Admin only
   - Delete: Admin only

4. **responses**: 
   - Create: Any authenticated user
   - Read: User can read own responses
   - Update: User can update own responses
   - Delete: User can delete own responses

## 🌟 Features Available

### Authentication
- ✅ Email/Password registration and login
- ✅ Password recovery
- ✅ User session management
- ✅ Profile updates
- 🔄 OAuth providers (can be added)
- 🔄 Multi-factor authentication (can be added)

### Database
- ✅ User profiles with preferences
- ✅ Interview sessions management
- ✅ Question library with search
- ✅ Response tracking and analysis
- ✅ File uploads for assets
- ✅ Advanced filtering and pagination

### Real-time (Available)
- 🔄 Real-time updates during interviews
- 🔄 Live collaboration features
- 🔄 Instant notifications

## 🚨 Important Notes

1. **Environment Variables**: Never commit your `.env` file. Keep your Project ID and other credentials secure.

2. **Permissions**: Always set up proper database permissions in Appwrite Console for security.

3. **Rate Limits**: Be aware of Appwrite's rate limits for your plan.

4. **Error Handling**: The composables include error handling, but always check for errors in your components.

5. **TypeScript**: The setup includes comprehensive TypeScript types. Use them for better development experience.

## 🔍 Testing Your Setup

1. Start your development server:
```bash
npm run dev
```

2. Check the browser console for the Appwrite initialization message:
```
✅ Appwrite initialized successfully
```

3. Try using the authentication in your login/signup pages.

## 📚 Additional Resources

- [Appwrite Documentation](https://appwrite.io/docs)
- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)

## 🆘 Troubleshooting

### Common Issues:

1. **"Project ID not found"**: Check your `.env` file and ensure the Project ID is correct.

2. **"Unauthorized"**: Verify your platform configuration in Appwrite Console matches your hostname.

3. **"Collection not found"**: Make sure you've created all the required collections in your database.

4. **CORS errors**: Ensure your domain is properly configured in the Appwrite platform settings.

---

Your TechTerview project is now ready to use Appwrite for authentication, database operations, and file storage! 🎉