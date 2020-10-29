import React from 'react'

export default function Tag ({html}) {
  return <div dangerouslySetInnerHTML={{__html: html}} />
}
