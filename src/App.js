import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from "./js/pages/Home";
import Pedido from "./js/pages/Pedido";
import Lote from "./js/pages/Lote";

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
            <Route path="/pedido" element={<Pedido />} />
            <Route path="/lote" element={<Lote />} />
          </Routes>
        </Container>
        <Footer/>
      </Router>
  );
}

export default App;
