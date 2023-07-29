import { createTheme } from '@uiw/codemirror-themes'
import { tags as t } from '@lezer/highlight'
// marron claro en ingles: lightbrown
const c = {
  naranja: '#a73f3f',
  calabaza: '#C58854',
  lightbrown: '#A04853',
  brown: '#A04853',
  green: '#8DDB8C',
  red: 'red',
  gray: '#c0c0c0',
  white: 'white',
}

export const myTheme = createTheme({
  theme: 'dark',
  settings: {
    background: '#00000055',
    foreground: c.calabaza,
    caret: c.white,
    selection: '#036dd626',
    selectionMatch: '#036dd626',
    lineHighlight: 'transparent',
    gutterBackground: 'transparent',
    gutterForeground: '#8a919966',
  },
  styles: [
    { tag: t.comment, color: '#787b8099' },
    { tag: t.variableName, color: c.naranja },
    { tag: [t.string, t.special(t.brace)], color: c.green },
    { tag: t.number, color: c.gray },
    { tag: t.bool, color: c.lightbrown },
    { tag: t.null, color: c.lightbrown },
    { tag: t.keyword, color: c.gray },
    { tag: t.operator, color: c.brown },
    { tag: t.className, color: c.white },
    { tag: t.definition(t.typeName), color: c.calabaza },
    { tag: t.typeName, color: c.calabaza },
    { tag: t.angleBracket, color: c.calabaza },
    { tag: t.tagName, color: c.green },
    { tag: t.attributeName, color: c.calabaza },
  ],
})
