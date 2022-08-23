import ApiContext from '../context/ApiContext'
import Meta from '../components/app/Meta'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ApiContext>
      <Meta />
      <Component {...pageProps} />
    </ApiContext>
  )
}

export default MyApp
