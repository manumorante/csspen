import Meta from '../components/app/Meta'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      {process.env.NODE_ENV === 'production' ? <Meta /> : null}
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
