import React from 'react'
import Script from 'next/script'
import { isProd } from 'lib/isDev'

export default function Gtag() {
  if (!isProd) return null
  return (
    <>
      {/* Global site tag (gtag.js) - Google Analytics */}
      <Script async src='https://www.googletagmanager.com/gtag/js?id=G-FZMR8SL35B' />
      <Script id='gtag-base' strategy='afterInteractive'>
        {`
        window.dataLayer = window.dataLayer || []
        function gtag() { dataLayer.push(arguments) }
        gtag('js', new Date())
        gtag('config', 'G-FZMR8SL35B')
      `}
      </Script>
    </>
  )
}
