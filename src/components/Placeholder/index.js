import React from 'react'

export default function Placeholder ({html}) {

  return (
    <div dangerouslySetInnerHTML={{__html: html}} />
  )
}





