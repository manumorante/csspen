let isDev = false

if (process && process.env.NODE_ENV === 'development') {
  isDev = false
}

export { isDev }
