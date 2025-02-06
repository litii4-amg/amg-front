import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from "./js/pages/Home";
import About from "./js/pages/About";
import Contact from "./js/pages/Contact";

import Container from "./js/layouts/Container";
import Navbar from "./js/layouts/Navbar";
import Footer from "./js/layouts/Footer";

function App() {
  return (
    <Router>
     <Navbar />
        <Container customClass="min-height">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Container>
        <Footer/>
      </Router>
  );
}

export default App;
