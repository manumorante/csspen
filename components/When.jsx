import React from 'react'

export default function When({ is, children }) {
  return is ? <>{children}</> : null
}
