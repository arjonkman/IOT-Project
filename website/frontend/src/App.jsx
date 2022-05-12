import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./Components/Header";
import Home from "./Components/Home";
import Rooms from "./Components/Rooms";
import Footer from "./Components/Footer";

// Import Bootstrap
import "bootstrap/scss/bootstrap.scss";
// Import customized version of bootstrap
import "./scss/bootstrap.scss";
// Import custom css
import "./scss/app.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <section className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/export" element={<></>} />
          </Routes>
        </section>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
