import 'bootstrap/dist/css/bootstrap.min.css';


import '../styles/globals.css'

import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

function Ettudo({ Component, pageProps }) {
  return (
    <>
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default Ettudo
