import { Client, Account, Databases, Storage, Teams, Functions, Messaging } from 'appwrite'

// Configuration interface
export interface AppwriteConfig {
  endpoint: string
  projectId: string
}

// Global instances
let client: Client | null = null
let account: Account | null = null
let databases: Databases | null = null
let storage: Storage | null = null
let teams: Teams | null = null
let functions: Functions | null = null
let messaging: Messaging | null = null
let config: AppwriteConfig | null = null

/**
 * Initialize Appwrite client and services
 */
export const initAppwrite = (appwriteConfig: AppwriteConfig) => {
  if (!client) {
    config = appwriteConfig
    
    if (!config.projectId) {
      throw new Error('Appwrite Project ID is required.')
    }
    
    client = new Client()
      .setEndpoint(config.endpoint)
      .setProject(config.projectId)
    
    // Initialize all services
    account = new Account(client)
    databases = new Databases(client)
    storage = new Storage(client)
    teams = new Teams(client)
    functions = new Functions(client)
    messaging = new Messaging(client)
  }
  
  return {
    client,
    account,
    databases,
    storage,
    teams,
    functions,
    messaging
  }
}

/**
 * Ensure Appwrite is initialized
 */
const ensureInitialized = () => {
  if (!client || !config) {
    throw new Error('Appwrite is not initialized. Please call initAppwrite() first or use the plugin.')
  }
}

/**
 * Get Appwrite client instance
 */
export const getClient = (): Client => {
  ensureInitialized()
  return client!
}

/**
 * Get Appwrite Account service
 */
export const getAccount = (): Account => {
  ensureInitialized()
  return account!
}

/**
 * Get Appwrite Databases service
 */
export const getDatabases = (): Databases => {
  ensureInitialized()
  return databases!
}

/**
 * Get Appwrite Storage service
 */
export const getStorage = (): Storage => {
  ensureInitialized()
  return storage!
}

/**
 * Get Appwrite Teams service
 */
export const getTeams = (): Teams => {
  ensureInitialized()
  return teams!
}

/**
 * Get Appwrite Functions service
 */
export const getFunctions = (): Functions => {
  ensureInitialized()
  return functions!
}

/**
 * Get Appwrite Messaging service
 */
export const getMessaging = (): Messaging => {
  ensureInitialized()
  return messaging!
}

/**
 * Check if Appwrite is initialized
 */
export const isInitialized = (): boolean => {
  return client !== null && config !== null
}

// Export the ID helper
export { ID } from 'appwrite'

// Export types
export type { 
  Client, 
  Account, 
  Databases, 
  Storage, 
  Teams, 
  Functions, 
  Messaging,
  Models
} from 'appwrite'