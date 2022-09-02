import React from 'react'
import Head from 'next/head'

export default function PenHead({ pen }) {
  if (!pen) return null

  const bgcolor = pen.colors?.c3 || '#000'

  if (typeof document !== 'undefined') {
    document.documentElement.style.backgroundColor = bgcolor
  }

  return (
    <Head>
      <title>{pen.name} - csspen</title>
      <meta name='theme-color' content={bgcolor} />
    </Head>
  )
}
