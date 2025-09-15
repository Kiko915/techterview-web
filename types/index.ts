import type { Models } from 'appwrite'

/**
 * TechTerview User Profile extension
 */
export interface UserProfile extends Models.Document {
  userId: string
  firstName: string
  lastName: string
  email: string
  profileImage?: string
  bio?: string
  skills: string[]
  experience: 'junior' | 'mid' | 'senior' | 'expert'
  preferredLanguages: string[]
  targetRoles: string[]
  completedInterviews: number
  averageScore: number
  preferences: UserPreferences
  createdAt: string
  updatedAt: string
}

/**
 * User Preferences
 */
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  notifications: {
    email: boolean
    push: boolean
    reminders: boolean
  }
  interview: {
    difficulty: 'easy' | 'medium' | 'hard' | 'mixed'
    duration: number // in minutes
    categories: string[]
    voice: boolean
    aiCoaching: boolean
  }
  privacy: {
    shareProgress: boolean
    publicProfile: boolean
  }
}

/**
 * Interview Session
 */
export interface InterviewSession extends Models.Document {
  userId: string
  title: string
  description?: string
  type: 'technical' | 'behavioral' | 'system-design' | 'coding' | 'mixed'
  difficulty: 'easy' | 'medium' | 'hard'
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  duration: number // in minutes
  scheduledAt?: string
  startedAt?: string
  completedAt?: string
  questions: InterviewQuestion[]
  responses: InterviewResponse[]
  feedback: InterviewFeedback
  score: number
  tags: string[]
  metadata: SessionMetadata
  createdAt: string
  updatedAt: string
}

/**
 * Interview Question
 */
export interface InterviewQuestion extends Models.Document {
  title: string
  description: string
  type: 'coding' | 'technical' | 'behavioral' | 'system-design' | 'multiple-choice'
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  tags: string[]
  content: QuestionContent
  expectedAnswer?: string
  hints?: string[]
  timeLimit?: number // in seconds
  weight: number // scoring weight
  metadata: QuestionMetadata
  createdAt: string
  updatedAt: string
}

/**
 * Question Content (varies by type)
 */
export type QuestionContent = 
  | CodingQuestionContent
  | TechnicalQuestionContent
  | BehavioralQuestionContent
  | SystemDesignQuestionContent
  | MultipleChoiceQuestionContent

export interface CodingQuestionContent {
  problem: string
  examples: Array<{
    input: string
    output: string
    explanation?: string
  }>
  constraints: string[]
  starterCode?: Record<string, string> // language -> code
  testCases: Array<{
    input: string
    expectedOutput: string
    hidden?: boolean
  }>
}

export interface TechnicalQuestionContent {
  question: string
  context?: string
  resources?: string[]
  keyPoints?: string[]
}

export interface BehavioralQuestionContent {
  question: string
  context?: string
  framework?: 'STAR' | 'CAR' | 'SOAR'
  followUpQuestions?: string[]
}

export interface SystemDesignQuestionContent {
  scenario: string
  requirements: string[]
  constraints: string[]
  considerations: string[]
  components?: string[]
}

export interface MultipleChoiceQuestionContent {
  question: string
  options: Array<{
    id: string
    text: string
    correct?: boolean
  }>
  explanation?: string
}

/**
 * Interview Response
 */
export interface InterviewResponse extends Models.Document {
  sessionId: string
  questionId: string
  userId: string
  type: 'text' | 'code' | 'voice' | 'drawing' | 'multiple-choice'
  content: ResponseContent
  timeSpent: number // in seconds
  submittedAt: string
  aiAnalysis?: AIAnalysis
  score?: number
  feedback?: string
  createdAt: string
  updatedAt: string
}

/**
 * Response Content (varies by type)
 */
export type ResponseContent = 
  | TextResponseContent
  | CodeResponseContent
  | VoiceResponseContent
  | DrawingResponseContent
  | MultipleChoiceResponseContent

export interface TextResponseContent {
  text: string
  wordCount: number
}

export interface CodeResponseContent {
  language: string
  code: string
  testResults?: Array<{
    input: string
    output: string
    expected: string
    passed: boolean
    executionTime?: number
  }>
}

export interface VoiceResponseContent {
  audioUrl: string
  transcription?: string
  duration: number // in seconds
}

export interface DrawingResponseContent {
  imageUrl: string
  annotations?: Array<{
    x: number
    y: number
    text: string
  }>
}

export interface MultipleChoiceResponseContent {
  selectedOptions: string[]
  confidence?: number // 0-100
}

/**
 * AI Analysis
 */
export interface AIAnalysis {
  clarity: number // 0-100
  relevance: number // 0-100
  completeness: number // 0-100
  technicalAccuracy?: number // 0-100
  communicationSkills?: number // 0-100
  strengths: string[]
  improvements: string[]
  suggestions: string[]
  overallScore: number // 0-100
}

/**
 * Interview Feedback
 */
export interface InterviewFeedback {
  overall: {
    score: number // 0-100
    summary: string
    strengths: string[]
    improvements: string[]
  }
  categories: Array<{
    name: string
    score: number
    feedback: string
  }>
  aiCoachNotes?: string[]
  nextSteps?: string[]
  recommendedResources?: Array<{
    title: string
    url: string
    type: 'article' | 'video' | 'course' | 'book' | 'practice'
  }>
}

/**
 * Session Metadata
 */
export interface SessionMetadata {
  userAgent?: string
  ipAddress?: string
  timezone?: string
  device?: {
    type: 'desktop' | 'mobile' | 'tablet'
    os: string
    browser: string
  }
  settings: {
    camera: boolean
    microphone: boolean
    screenShare: boolean
    aiCoaching: boolean
  }
}

/**
 * Question Metadata
 */
export interface QuestionMetadata {
  source?: string
  company?: string
  role?: string
  frequency: 'common' | 'moderate' | 'rare'
  successRate?: number // 0-100
  averageTime?: number // in seconds
  lastUsed?: string
}

/**
 * API Response Types
 */
export interface PaginatedResponse<T> {
  documents: T[]
  total: number
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

/**
 * Interview Statistics
 */
export interface InterviewStats {
  totalSessions: number
  completedSessions: number
  averageScore: number
  totalTimeSpent: number // in minutes
  improvementTrend: number // percentage change
  categoryBreakdown: Array<{
    category: string
    sessions: number
    averageScore: number
  }>
  recentSessions: InterviewSession[]
}

/**
 * Dashboard Data
 */
export interface DashboardData {
  user: UserProfile
  stats: InterviewStats
  upcomingSessions: InterviewSession[]
  recentFeedback: InterviewFeedback[]
  recommendations: Array<{
    type: 'question' | 'topic' | 'skill'
    title: string
    description: string
    priority: 'high' | 'medium' | 'low'
  }>
}

/**
 * Search Filters
 */
export interface SearchFilters {
  type?: string[]
  difficulty?: string[]
  category?: string[]
  duration?: {
    min: number
    max: number
  }
  tags?: string[]
  dateRange?: {
    start: string
    end: string
  }
}

/**
 * Export types for use in components
 */
export type {
  Models
} from 'appwrite'