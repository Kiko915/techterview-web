import { getDatabases, getStorage } from '../utils/appwrite'
import type { 
  UserProfile, 
  InterviewSession, 
  InterviewQuestion, 
  InterviewResponse,
  PaginatedResponse,
  SearchFilters
} from '../types'
import { Query, ID } from 'appwrite'

/**
 * Database composable for TechTerview
 */
export const useDatabase = () => {
  const databases = getDatabases()
  const storage = getStorage()
  const config = useRuntimeConfig()

  const databaseId = config.public.appwrite.databaseId
  const collections = config.public.appwrite.collections
  const bucketId = config.public.appwrite.bucketId

  /**
   * User Profile Operations
   */
  const createUserProfile = async (profile: Omit<UserProfile, '$id' | '$createdAt' | '$updatedAt' | '$permissions' | '$databaseId' | '$collectionId'>): Promise<UserProfile> => {
    try {
      const response = await databases.createDocument(
        databaseId,
        collections.users,
        ID.unique(),
        profile
      )
      return response as UserProfile
    } catch (error) {
      console.error('Error creating user profile:', error)
      throw error
    }
  }

  const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      const response = await databases.getDocument(
        databaseId,
        collections.users,
        userId
      )
      return response as UserProfile
    } catch (error) {
      console.error('Error getting user profile:', error)
      return null
    }
  }

  const updateUserProfile = async (userId: string, updates: Partial<UserProfile>): Promise<UserProfile> => {
    try {
      const response = await databases.updateDocument(
        databaseId,
        collections.users,
        userId,
        updates
      )
      return response as UserProfile
    } catch (error) {
      console.error('Error updating user profile:', error)
      throw error
    }
  }

  /**
   * Interview Session Operations
   */
  const createInterviewSession = async (session: Omit<InterviewSession, '$id' | '$createdAt' | '$updatedAt' | '$permissions' | '$databaseId' | '$collectionId'>): Promise<InterviewSession> => {
    try {
      const response = await databases.createDocument(
        databaseId,
        collections.interviews,
        ID.unique(),
        session
      )
      return response as InterviewSession
    } catch (error) {
      console.error('Error creating interview session:', error)
      throw error
    }
  }

  const getInterviewSession = async (sessionId: string): Promise<InterviewSession | null> => {
    try {
      const response = await databases.getDocument(
        databaseId,
        collections.interviews,
        sessionId
      )
      return response as InterviewSession
    } catch (error) {
      console.error('Error getting interview session:', error)
      return null
    }
  }

  const updateInterviewSession = async (sessionId: string, updates: Partial<InterviewSession>): Promise<InterviewSession> => {
    try {
      const response = await databases.updateDocument(
        databaseId,
        collections.interviews,
        sessionId,
        updates
      )
      return response as InterviewSession
    } catch (error) {
      console.error('Error updating interview session:', error)
      throw error
    }
  }

  const getUserInterviewSessions = async (
    userId: string, 
    limit: number = 20, 
    offset: number = 0,
    filters?: SearchFilters
  ): Promise<PaginatedResponse<InterviewSession>> => {
    try {
      const queries = [
        Query.equal('userId', userId),
        Query.limit(limit),
        Query.offset(offset),
        Query.orderDesc('$createdAt')
      ]

      // Add filters
      if (filters?.type?.length) {
        queries.push(Query.equal('type', filters.type))
      }
      if (filters?.difficulty?.length) {
        queries.push(Query.equal('difficulty', filters.difficulty))
      }
      if (filters?.dateRange) {
        if (filters.dateRange.start) {
          queries.push(Query.greaterThanEqual('$createdAt', filters.dateRange.start))
        }
        if (filters.dateRange.end) {
          queries.push(Query.lessThanEqual('$createdAt', filters.dateRange.end))
        }
      }

      const response = await databases.listDocuments(
        databaseId,
        collections.interviews,
        queries
      )

      return {
        documents: response.documents as InterviewSession[],
        total: response.total
      }
    } catch (error) {
      console.error('Error getting user interview sessions:', error)
      throw error
    }
  }

  /**
   * Question Operations
   */
  const getInterviewQuestions = async (
    filters?: SearchFilters,
    limit: number = 10
  ): Promise<InterviewQuestion[]> => {
    try {
      const queries = [
        Query.limit(limit),
        Query.orderAsc('difficulty')
      ]

      // Add filters
      if (filters?.type?.length) {
        queries.push(Query.equal('type', filters.type))
      }
      if (filters?.difficulty?.length) {
        queries.push(Query.equal('difficulty', filters.difficulty))
      }
      if (filters?.category?.length) {
        queries.push(Query.equal('category', filters.category))
      }
      if (filters?.tags?.length) {
        queries.push(Query.contains('tags', filters.tags))
      }

      const response = await databases.listDocuments(
        databaseId,
        collections.questions,
        queries
      )

      return response.documents as InterviewQuestion[]
    } catch (error) {
      console.error('Error getting interview questions:', error)
      throw error
    }
  }

  const getQuestionById = async (questionId: string): Promise<InterviewQuestion | null> => {
    try {
      const response = await databases.getDocument(
        databaseId,
        collections.questions,
        questionId
      )
      return response as InterviewQuestion
    } catch (error) {
      console.error('Error getting question:', error)
      return null
    }
  }

  /**
   * Response Operations
   */
  const createInterviewResponse = async (response: Omit<InterviewResponse, '$id' | '$createdAt' | '$updatedAt' | '$permissions' | '$databaseId' | '$collectionId'>): Promise<InterviewResponse> => {
    try {
      const result = await databases.createDocument(
        databaseId,
        collections.responses,
        ID.unique(),
        response
      )
      return result as InterviewResponse
    } catch (error) {
      console.error('Error creating interview response:', error)
      throw error
    }
  }

  const getSessionResponses = async (sessionId: string): Promise<InterviewResponse[]> => {
    try {
      const response = await databases.listDocuments(
        databaseId,
        collections.responses,
        [
          Query.equal('sessionId', sessionId),
          Query.orderAsc('$createdAt')
        ]
      )
      return response.documents as InterviewResponse[]
    } catch (error) {
      console.error('Error getting session responses:', error)
      throw error
    }
  }

  const updateInterviewResponse = async (responseId: string, updates: Partial<InterviewResponse>): Promise<InterviewResponse> => {
    try {
      const response = await databases.updateDocument(
        databaseId,
        collections.responses,
        responseId,
        updates
      )
      return response as InterviewResponse
    } catch (error) {
      console.error('Error updating interview response:', error)
      throw error
    }
  }

  /**
   * File Upload Operations
   */
  const uploadFile = async (file: File): Promise<{ fileId: string; url: string }> => {
    try {
      const response = await storage.createFile(
        bucketId,
        ID.unique(),
        file
      )

      const url = storage.getFileView(bucketId, response.$id)

      return {
        fileId: response.$id,
        url: url.toString()
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      throw error
    }
  }

  const deleteFile = async (fileId: string): Promise<void> => {
    try {
      await storage.deleteFile(bucketId, fileId)
    } catch (error) {
      console.error('Error deleting file:', error)
      throw error
    }
  }

  /**
   * Search and Analytics
   */
  const searchQuestions = async (
    searchTerm: string,
    filters?: SearchFilters,
    limit: number = 20
  ): Promise<InterviewQuestion[]> => {
    try {
      const queries = [
        Query.search('title', searchTerm),
        Query.limit(limit)
      ]

      // Add filters
      if (filters?.type?.length) {
        queries.push(Query.equal('type', filters.type))
      }
      if (filters?.difficulty?.length) {
        queries.push(Query.equal('difficulty', filters.difficulty))
      }
      if (filters?.category?.length) {
        queries.push(Query.equal('category', filters.category))
      }

      const response = await databases.listDocuments(
        databaseId,
        collections.questions,
        queries
      )

      return response.documents as InterviewQuestion[]
    } catch (error) {
      console.error('Error searching questions:', error)
      throw error
    }
  }

  const getUserStats = async (userId: string) => {
    try {
      // Get user's completed sessions
      const completedSessions = await databases.listDocuments(
        databaseId,
        collections.interviews,
        [
          Query.equal('userId', userId),
          Query.equal('status', 'completed'),
          Query.orderDesc('$createdAt')
        ]
      )

      const sessions = completedSessions.documents as InterviewSession[]
      
      // Calculate statistics
      const totalSessions = sessions.length
      const averageScore = totalSessions > 0 
        ? sessions.reduce((sum, session) => sum + session.score, 0) / totalSessions 
        : 0
      
      const totalTimeSpent = sessions.reduce((sum, session) => sum + session.duration, 0)

      // Category breakdown
      const categoryStats = sessions.reduce((acc, session) => {
        const type = session.type
        if (!acc[type]) {
          acc[type] = { sessions: 0, totalScore: 0 }
        }
        acc[type].sessions++
        acc[type].totalScore += session.score
        return acc
      }, {} as Record<string, { sessions: number; totalScore: number }>)

      const categoryBreakdown = Object.entries(categoryStats).map(([category, stats]) => ({
        category,
        sessions: stats.sessions,
        averageScore: stats.totalScore / stats.sessions
      }))

      return {
        totalSessions,
        averageScore,
        totalTimeSpent,
        categoryBreakdown,
        recentSessions: sessions.slice(0, 5)
      }
    } catch (error) {
      console.error('Error getting user stats:', error)
      throw error
    }
  }

  return {
    // User Profile
    createUserProfile,
    getUserProfile,
    updateUserProfile,
    
    // Interview Sessions
    createInterviewSession,
    getInterviewSession,
    updateInterviewSession,
    getUserInterviewSessions,
    
    // Questions
    getInterviewQuestions,
    getQuestionById,
    searchQuestions,
    
    // Responses
    createInterviewResponse,
    getSessionResponses,
    updateInterviewResponse,
    
    // Files
    uploadFile,
    deleteFile,
    
    // Analytics
    getUserStats
  }
}