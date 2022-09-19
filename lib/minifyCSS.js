export const minifyCSS = (css) => {
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
