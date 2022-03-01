import React from 'react'

export default function Styles ({pen}) {
  return <div dangerouslySetInnerHTML={{__html: `<style type="text/css">${pen.rawCode}</style>`}} />
}
