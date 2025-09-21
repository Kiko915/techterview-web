import type { Models } from 'appwrite'
import { getAccount } from '../utils/appwrite'
import { ID } from 'appwrite'
import { computed, readonly } from 'vue'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  name: string
}

export interface AuthState {
  user: Models.User<Models.Preferences> | null
  loading: boolean
  error: string | null
}

/**
 * Authentication composable for TechTerview
 */
export const useAuth = () => {
  const user = useState<Models.User<Models.Preferences> | null>('auth.user', () => null)
  const loading = useState<boolean>('auth.loading', () => false)
  const error = useState<string | null>('auth.error', () => null)

  // Get account instance only when needed, with initialization check
  const getAccountInstance = () => {
    try {
      return getAccount()
    } catch (error) {
      throw new Error('Appwrite client not initialized. Please wait for initialization to complete.')
    }
  }

  /**
   * Clear error state
   */
  const clearError = () => {
    error.value = null
  }

  /**
   * Set loading state
   */
  const setLoading = (value: boolean) => {
    loading.value = value
  }

  /**
   * Set error state
   */
  const setError = (message: string) => {
    error.value = message
  }

  /**
   * Get current user session with retry for initialization
   */
  const getCurrentUser = async (retryCount = 0): Promise<Models.User<Models.Preferences> | null> => {
    try {
      setLoading(true)
      clearError()
      
      console.log('🔍 getCurrentUser: Making API call to account.get()')
      const currentUser = await getAccountInstance().get()
      console.log('✅ getCurrentUser: API call successful:', currentUser)
      user.value = currentUser
      return currentUser
    } catch (err: any) {
      console.log('❌ getCurrentUser: API call failed:', err.message, err.code, err.type)
      
      // If Appwrite is not initialized and we haven't retried too many times
      if (err.message?.includes('not initialized') && retryCount < 3) {
        console.log(`🔄 getCurrentUser: Retrying in 500ms (attempt ${retryCount + 1}/3)`)
        await new Promise(resolve => setTimeout(resolve, 500))
        return getCurrentUser(retryCount + 1)
      }
      
      // User is not authenticated or max retries reached
      user.value = null
      return null
    } finally {
      setLoading(false)
    }
  }

  /**
   * Login with email and password
   */
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setLoading(true)
      clearError()

      // Check if user is already logged in
      try {
        const currentUser = await getAccountInstance().get()
        if (currentUser) {
          // User is already logged in, update state and return success
          user.value = currentUser
          return true
        }
      } catch {
        // No active session, continue with login
      }

      // Create email session
      console.log('🔐 Login: Creating email password session...')
      await getAccountInstance().createEmailPasswordSession(
        credentials.email,
        credentials.password
      )
      console.log('✅ Login: Session created successfully')

      // Get user data
      console.log('👤 Login: Getting user data...')
      await getCurrentUser()
      console.log('✅ Login: User data retrieved, login successful')
      
      return true
    } catch (err: any) {
      // Handle specific session already exists error
      if (err.code === 401 && err.type === 'user_session_already_exists') {
        // Delete current session and try again
        try {
          await getAccountInstance().deleteSession('current')
          // Retry login after clearing session
          await getAccountInstance().createEmailPasswordSession(
            credentials.email,
            credentials.password
          )
          await getCurrentUser()
          return true
        } catch (retryErr: any) {
          setError(retryErr.message || 'Login failed after clearing session')
          return false
        }
      }
      
      setError(err.message || 'Login failed')
      return false
    } finally {
      setLoading(false)
    }
  }

  /**
   * Register new user
   */
  const register = async (credentials: RegisterCredentials): Promise<boolean> => {
    try {
      setLoading(true)
      clearError()

      // Create account
      await getAccountInstance().create(
        ID.unique(),
        credentials.email,
        credentials.password,
        credentials.name
      )

      // Auto-login after registration
      const loginSuccess = await login({
        email: credentials.email,
        password: credentials.password
      })

      return loginSuccess
    } catch (err: any) {
      setError(err.message || 'Registration failed')
      return false
    } finally {
      setLoading(false)
    }
  }

  /**
   * Logout current user
   */
  const logout = async (): Promise<boolean> => {
    try {
      setLoading(true)
      clearError()

      await getAccountInstance().deleteSession('current')
      user.value = null
      
      // Redirect to login page
      await navigateTo('/login')
      
      return true
    } catch (err: any) {
      setError(err.message || 'Logout failed')
      return false
    } finally {
      setLoading(false)
    }
  }

  /**
   * Send password recovery email
   */
  const sendPasswordRecovery = async (email: string): Promise<boolean> => {
    try {
      setLoading(true)
      clearError()

      await getAccountInstance().createRecovery(
        email,
        `${window.location.origin}/reset-password`
      )
      
      return true
    } catch (err: any) {
      setError(err.message || 'Failed to send recovery email')
      return false
    } finally {
      setLoading(false)
    }
  }

  /**
   * Reset password with recovery token
   */
  const resetPassword = async (
    userId: string,
    secret: string,
    password: string,
    confirmPassword: string
  ): Promise<boolean> => {
    try {
      setLoading(true)
      clearError()

      if (password !== confirmPassword) {
        setError('Passwords do not match')
        return false
      }

      await getAccountInstance().updateRecovery(
        userId,
        secret,
        password
      )
      
      return true
    } catch (err: any) {
      setError(err.message || 'Failed to reset password')
      return false
    } finally {
      setLoading(false)
    }
  }

  /**
   * Update user preferences
   */
  const updatePreferences = async (preferences: Record<string, any>): Promise<boolean> => {
    try {
      setLoading(true)
      clearError()

      const updatedUser = await getAccountInstance().updatePrefs(preferences)
      user.value = updatedUser
      
      return true
    } catch (err: any) {
      setError(err.message || 'Failed to update preferences')
      return false
    } finally {
      setLoading(false)
    }
  }

  /**
   * Update user name
   */
  const updateName = async (name: string): Promise<boolean> => {
    try {
      setLoading(true)
      clearError()

      const updatedUser = await getAccountInstance().updateName(name)
      user.value = updatedUser
      
      return true
    } catch (err: any) {
      setError(err.message || 'Failed to update name')
      return false
    } finally {
      setLoading(false)
    }
  }

  /**
   * Update user email
   */
  const updateEmail = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)
      clearError()

      const updatedUser = await getAccountInstance().updateEmail(email, password)
      user.value = updatedUser
      
      return true
    } catch (err: any) {
      setError(err.message || 'Failed to update email')
      return false
    } finally {
      setLoading(false)
    }
  }

  /**
   * Update user password
   */
  const updatePassword = async (newPassword: string, oldPassword: string): Promise<boolean> => {
    try {
      setLoading(true)
      clearError()

      await getAccountInstance().updatePassword(newPassword, oldPassword)
      
      return true
    } catch (err: any) {
      setError(err.message || 'Failed to update password')
      return false
    } finally {
      setLoading(false)
    }
  }

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = computed(() => user.value !== null)

  /**
   * Get user's full name
   */
  const userName = computed(() => user.value?.name || '')

  /**
   * Get user's email
   */
  const userEmail = computed(() => user.value?.email || '')

  /**
   * Initialize auth state on app load
   */
  const initAuth = async () => {
    await getCurrentUser()
  }

  /**
   * Initiate Google OAuth login
   */
  const loginWithGoogle = () => {
    try {
      console.log('🔐 Google Login: Initiating OAuth session...')
      setLoading(true)
      clearError()
      
      const account = getAccountInstance()
      
      // Create OAuth2 session with Google
      account.createOAuth2Session(
        'google' as any, // provider - using as any for compatibility
        `${window.location.origin}/dashboard`, // success URL
        `${window.location.origin}/login?error=oauth_failed&reason=email_exists` // failure URL with reason
      )
    } catch (err: any) {
      console.error('❌ Google Login Error:', err)
      setError(err.message || 'Failed to initiate Google login')
      setLoading(false)
    }
  }

  /**
   * Initiate Google OAuth signup
   */
  const signupWithGoogle = () => {
    try {
      console.log('🔐 Google Signup: Initiating OAuth session...')
      setLoading(true)
      clearError()
      
      const account = getAccountInstance()
      
      // Create OAuth2 session with Google
      account.createOAuth2Session(
        'google' as any, // provider - using as any for compatibility
        `${window.location.origin}/dashboard`, // success URL
        `${window.location.origin}/signup?error=oauth_failed&reason=email_exists` // failure URL with reason
      )
    } catch (err: any) {
      console.error('❌ Google Signup Error:', err)
      setError(err.message || 'Failed to initiate Google signup')
      setLoading(false)
    }
  }

  return {
    // State
    user: readonly(user),
    loading: readonly(loading),
    error: readonly(error),
    
    // Computed
    isAuthenticated,
    userName,
    userEmail,
    
    // Methods
    clearError,
    getCurrentUser,
    initAuth,
    login,
    register,
    logout,
    sendPasswordRecovery,
    resetPassword,
    updatePreferences,
    updateName,
    updateEmail,
    updatePassword,
    loginWithGoogle,
    signupWithGoogle
  }
}