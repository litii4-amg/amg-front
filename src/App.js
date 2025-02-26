import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from "./js/pages/Home";
import Pedido from "./js/pages/Pedido";
import Lote from "./js/pages/Lote";
import Produto from "./js/pages/Produto";
import Parada from "./js/pages/Parada";
import Produtividade from "./js/pages/Produtividade";
import FolhaProducao from "./js/pages/FolhaProducao";

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
            <Route path="/produto" element={<Produto />} />
            <Route path="/parada" element={<Parada />} />
            <Route path="/produtividade" element= {<Produtividade />} />
            <Route path="/folhaProducao" element={<FolhaProducao />} />
          </Routes>
        </Container>
        <Footer/>
      </Router>
  );
}

export default App;
