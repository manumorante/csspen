console.log('process', process)
console.log('process.env', process.env)
console.log('process.env.NODE_ENV', process.env.NODE_ENV)

let isDev = false

if (process && process.env.NODE_ENV === 'development') {
  isDev = true
}

export { isDev }
