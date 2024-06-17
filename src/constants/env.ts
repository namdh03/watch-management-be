import { config } from 'dotenv'

config()

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue

  if (value === undefined) {
    throw Error(`Missing String environment variable for ${key}`)
  }

  return value
}

export const PORT = getEnv('PORT', '8080')
export const JWT_SECRET_ACCESS_TOKEN = getEnv('JWT_SECRET_ACCESS_TOKEN')
export const JWT_SECRET_REFRESH_TOKEN = getEnv('JWT_SECRET_REFRESH_TOKEN')
export const ACCESS_TOKEN_EXPIRES_IN = getEnv('ACCESS_TOKEN_EXPIRES_IN')
export const REFRESH_TOKEN_EXPIRES_IN = getEnv('REFRESH_TOKEN_EXPIRES_IN')
