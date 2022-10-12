import { createTheme } from '@uiw/codemirror-themes'
import { tags as t } from '@lezer/highlight'

export const myTheme = createTheme({
  theme: 'dark',
  settings: {
    background: 'transparent',
    foreground: '#75baff',
    caret: '#5d00ff',
    selection: '#036dd626',
    selectionMatch: '#036dd626',
    lineHighlight: 'transparent',
    gutterBackground: 'transparent',
    gutterForeground: '#8a919966',
  },
  styles: [
    { tag: t.comment, color: '#787b8099' },
    { tag: t.variableName, color: '#0080ff' },
    { tag: [t.string, t.special(t.brace)], color: '#8DDB8C' },
    { tag: t.number, color: '#8DDB8C' },
    { tag: t.bool, color: '#8DDB8C' },
    { tag: t.null, color: '#8DDB8C' },
    { tag: t.keyword, color: '#8DDB8C' },
    { tag: t.operator, color: '#8DDB8C' },
    { tag: t.className, color: '#6CB6FF' },
    { tag: t.definition(t.typeName), color: '#8DDB8C' },
    { tag: t.typeName, color: '#8DDB8C' },
    { tag: t.angleBracket, color: '#8DDB8C' },
    { tag: t.tagName, color: '#8DDB8C' },
    { tag: t.attributeName, color: '#8DDB8C' },
  ],
})