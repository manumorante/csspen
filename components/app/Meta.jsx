import React from 'react'
import Head from 'next/head'
import Script from 'next/script'

const Meta = () => {
  if (process.env.NODE_ENV !== 'production') return null

  return (
    <>
      <Head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='description' content='Logos famosos animados paso a paso con CSS' />
        <link rel='icon' href='/favicon.ico' />
        <title>csspen - Logos famosos animados paso a paso con CSS</title>

        <meta property='og:title' content='Logos famosos en CSS' />
        <meta property='og:site_name' content='csspen' />
        <meta property='og:url' content='https://csspen.es' />
        <meta property='og:description' content='Logos famosos animados paso a paso con CSS' />
        <meta property='og:type' content='website' />
        <meta property='og:image' content='https://csspen.es/csspen_og.png' />
      </Head>

      {/* Global site tag (gtag.js) - Google Analytics */}
      <Script async src='https://www.googletagmanager.com/gtag/js?id=G-FZMR8SL35B' />
      <Script id='gtag-base' strategy='afterInteractive'>
        {`
        window.dataLayer = window.dataLayer || []
        function gtag() {
          dataLayer.push(arguments)
        }
        gtag('js', new Date())
        gtag('config', 'G-FZMR8SL35B')
      `}
      </Script>
    </>
  )
}

export default Meta
