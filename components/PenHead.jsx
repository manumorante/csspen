import React from 'react'
import Head from 'next/head'

export default function PenHead(props) {
  const title = props.name
    ? `'${props.name}' y otros logos famosos animados paso a paso con CSS`
    : `Logos famosos animados paso a paso con CSS`
  const description = title
  const url = props.id ? `https://csspen.es/${props.id}` : 'https://csspen.es'
  const bgcolor = props.bgcolor || '#000000'

  if (typeof document !== 'undefined') {
    document.documentElement.style.backgroundColor = bgcolor
  }

  return (
    <Head>
      <meta charset='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <link rel='icon' href='/favicon.ico' />

      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='theme-color' content={bgcolor} />

      <meta property='og:title' content={title} />
      <meta property='og:url' content={url} />
      <meta property='og:description' content={description} />
      <meta property='og:site_name' content='csspen' />
      <meta property='og:type' content='website' />
      <meta property='og:image' content='https://csspen.es/csspen_og.png' />
    </Head>
  )
}
