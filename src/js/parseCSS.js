import cssParser from 'css'

export default function parseCSS(paramCSS) {
  try {
    const cssToParse = cssParser.parse(paramCSS)
    const cssResult = cssParser.stringify(cssToParse, { sourcemap: true })
    return cssResult.code
  } catch (e) {
    return paramCSS
  }
}
