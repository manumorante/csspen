export const addScope = (css, scope) => {
  const selectorRegex = /(\.[\w-\s\.\:\>\[\]\*\=\']+)(?=[\{|\,])/g
  return css.replace(selectorRegex, `${scope} $1`)
}

export const minify = (css) => {
  if (typeof css !== 'string') return css

  return css
    .replace(/\s+/g, ' ')
    .replace(/\/\*.*?\*\//g, '')
    .replace(/ {/g, '{')
    .replace(/} /g, '}')
    .replace(/; /g, ';')
    .replace(/: /g, ':')
    .replace(/, /g, ',')
}
