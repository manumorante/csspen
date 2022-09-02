import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='es' className='transition-colors' style={{ backgroundColor: '#000' }}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
