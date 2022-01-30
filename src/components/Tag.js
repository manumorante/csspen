import React from 'react'

export default function Tag ({html, className=''}) {
  return <div className={className} dangerouslySetInnerHTML={{__html: html}} />
}
