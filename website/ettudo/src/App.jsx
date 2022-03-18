import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Header from './Components/Header'
import Home from './Components/Home'

// Import Bootstrap
import 'bootstrap/scss/bootstrap.scss'
// Import customized version of bootstrap
import './scss/bootstrap.scss'

function App() {

  return (
    <Router>
      <div className="App">
        <Header/>
        <section className="content">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/analyse" element={<></>}/>
            <Route path="/export" element={<></>}/>
          </Routes>
        </section>
      </div>
    </Router>
  )
}

export default App
