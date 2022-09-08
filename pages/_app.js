import Gtag from '../components/Gtag'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Gtag />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
