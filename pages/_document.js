import { Html, Head, Main, NextScript } from 'next/document'
import { useRouter } from 'next/router'

export default function Document() {
  const router = useRouter()
  const bgcolor = router?.query === 'heart' ? '#f00' : '#000'
  const style = { backgroundColor: bgcolor }
  
  return (
    <Html lang='es' className='transition-colors' style={style}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
