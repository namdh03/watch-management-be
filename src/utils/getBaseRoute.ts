import errorPageMappings from './errorPageMappings'

// Helper function to find the matching base route
const getBaseRoute = (url: string): string | undefined => {
  const keys = Object.keys(errorPageMappings)
  return keys.find((key) => url.startsWith(key))
}

export default getBaseRoute
