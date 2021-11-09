const platform = typeof(window) === 'undefined' ? 'node' : 'browser' as const
const runtime = process.env.NODE_ENV || 'dev'

const env = {
  platform,
  runtime,
} as const

export default env
