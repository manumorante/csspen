import React from 'react'

export default function Html({ html, classes }) {
  return <div className={classes} dangerouslySetInnerHTML={{ __html: html }} />
}
