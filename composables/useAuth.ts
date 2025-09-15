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

  const account = getAccount()

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
   * Get current user session
   */
  const getCurrentUser = async (): Promise<Models.User<Models.Preferences> | null> => {
    try {
      setLoading(true)
      clearError()
      
      const currentUser = await account.get()
      user.value = currentUser
      return currentUser
    } catch (err: any) {
      // User is not authenticated
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

      // Create email session
      await account.createEmailPasswordSession(
        credentials.email,
        credentials.password
      )

      // Get user data
      await getCurrentUser()
      
      return true
    } catch (err: any) {
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
      await account.create(
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

      await account.deleteSession('current')
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

      await account.createRecovery(
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

      await account.updateRecovery(
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

      const updatedUser = await account.updatePrefs(preferences)
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

      const updatedUser = await account.updateName(name)
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

      const updatedUser = await account.updateEmail(email, password)
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

      await account.updatePassword(newPassword, oldPassword)
      
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
    updatePassword
  }
}