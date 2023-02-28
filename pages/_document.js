import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='es' style={{ backgroundColor: '#1F2937' /*bg-gray-800*/ }}>
      <Head />
      <body className="flex justify-center items-center">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
