import React from 'react'
import Head from 'next/head'

export default function PenHead({ id, name, bgcolor }) {
  if (name === '' || bgcolor === '') return null

  if (typeof document !== 'undefined') {
    document.documentElement.style.backgroundColor = bgcolor
  }

  return (
    <Head>
      <meta charset='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <link rel='icon' href='/favicon.ico' />

      <title>{`'${name}' creado y animado paso a paso`}</title>
      <meta name='description' content={`'${name}' y otros logos famosos animados paso a paso con CSS`} />
      <meta name='theme-color' content={bgcolor} />

      <meta property='og:title' content={`${name} en csspen`} />
      <meta property='og:url' content={`https://csspen.es/${id}`} />
      <meta property='og:description' content={`'${name}' y otros logos famosos animados paso a paso con CSS`} />
      <meta property='og:site_name' content='csspen' />
      <meta property='og:type' content='website' />
      <meta property='og:image' content='https://csspen.es/csspen_og.png' />
    </Head>
  )
}
