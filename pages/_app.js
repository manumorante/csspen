import ApiContext from '../context/ApiContext'
import Gtag from '../components/Gtag'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ApiContext>
      <Gtag />
      <Component {...pageProps} />
    </ApiContext>
  )
}

export default MyApp
