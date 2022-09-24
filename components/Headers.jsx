import React from 'react'
import Head from 'next/head'

export default function Headers(props) {
  const { penID, penName, color } = props

  const title = `${penName} - csspen`
  const description = `${penName} y otros logos famosos animados paso a paso con CSS`
  const url = 'https://csspen.es/' + penID
  const ogImage = 'https://csspen.es/og/' + penID + '.jpeg'

  if (typeof document !== 'undefined') {
    document.documentElement.style.backgroundColor = color
  }

  return (
    <Head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <link rel='icon' href='/favicon.ico' />

      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='theme-color' content={color} />

      <meta property='og:title' content={title} />
      <meta property='og:url' content={url} />
      <meta property='og:description' content={description} />
      <meta property='og:site_name' content='csspen' />
      <meta property='og:type' content='website' />
      <meta property='og:image' content={ogImage} />
    </Head>
  )
}
