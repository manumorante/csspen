export const addScope = (css: string, scope: string) => {
  const selectorRegex = /(\.[\w-\s\.\:\>\[\]\*\=\']+)(?=[\{|\,])/g
  return css.replace(selectorRegex, `${scope} $1`)
}

export const minify = (css: string) => {
  if (typeof css !== "string") return css

  return css
    .replace(/\s+/g, " ")
    .replace(/\/\*.*?\*\//g, "")
    .replace(/ {/g, "{")
    .replace(/} /g, "}")
    .replace(/; /g, ";")
    .replace(/: /g, ":")
    .replace(/, /g, ",")
}
