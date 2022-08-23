import { cloneElement } from 'react'

export default function When({ is, children, ...props }) {
  if (!is) return null
  const component = cloneElement(children, props)

  return is ? <>{component}</> : null
}
