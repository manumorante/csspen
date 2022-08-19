import Meta from '../components/app/Meta'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Meta />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
