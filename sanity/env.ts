export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-19'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder'

export const isSanityConfigured =
  projectId !== 'placeholder' &&
  dataset !== 'placeholder' &&
  projectId !== '' &&
  dataset !== ''
