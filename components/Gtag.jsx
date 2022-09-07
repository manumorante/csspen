import React from 'react'
import Script from 'next/script'

export default function Gtag() {
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
