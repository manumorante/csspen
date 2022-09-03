import React from 'react'
import Head from 'next/head'

export default function PenHead({ name, bgcolor }) {
  if (name === '' || bgcolor === '') return null

  if (typeof document !== 'undefined') {
    document.documentElement.style.backgroundColor = bgcolor
  }

  return (
    <Head>
      <title>{name} - csspen</title>
      <meta name='theme-color' content={bgcolor} />
    </Head>
  )
}
