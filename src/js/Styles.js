import { styles } from '../styles.js'

export const layout = styles.layout.styles
export const debug = styles.debug.styles

export const KeyStyle = (keysParam = [], extra_classes = '') => {
  // Clean empty positions
  const keys = keysParam.filter((n) => n)

  // Old school JS :D 
  let label = ''
  let value = ''
  let key0
  let key1
  let data0
  let data1

  if (keys.length > 0) {
    if (keys[0]) {
      key0 = keys[0]

      if (layout[key0]) {
        data0 = layout[key0]
        
        if (data0[keys[1]]) {
          key1 = keys[1]
          data1 = data0[key1]

          label = `[${key0}.${key1}]`
          value = data1
        } else {
          label = `[${key0}]`
          value = data0
        }
      } else {
        label = `[${key0} no found]`
        console.log(`[Styles] KeyStyle: Key '${key0}' not found`)
      }
    } else {
      label = '[empty key]'
    }
  } else {
    label = '[no key]'
  }

  const classes = extra_classes.split(' ').filter((n) => n)

  return {
    // The class property is hijacked to force all classes to pass through here.
    className: [
      label,
      value,
      classes.join(' '),
    ].join(' '),
  }
}
