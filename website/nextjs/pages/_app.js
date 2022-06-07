import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'

import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

import { useCookies } from 'react-cookie';


function Ettudo({ Component, pageProps }) {
  const [cookies, setCookie] = useCookies(['session_id']);

  if (cookies.session_id == undefined) {
    if (typeof window !== 'undefined') {
      if (!window.location.href.includes('/login')) {
        window.location.href = '/login';
      }
    }
  } else {
    setCookie('session_id', cookies.session_id, {
      path: '/',
      maxAge: 3600,
    });
  }

  return (
    <>
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default Ettudo
