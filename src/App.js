import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from "./pages/Home/Home";
import Pedido from "./pages/Pedido/Pedido";
import Lote from "./pages/Lote/Lote";
import Produto from "./pages/Produto";
import Parada from "./pages/Parada/Parada";
import Produtividade from "./pages/Produtividade/Produtividade";
import FolhaProducao from "./pages/FolhaProducao/FolhaProducao";
import FolhaProducaoAudio from "./pages/FolhaProducaoAudio";
import FolhaProducaoDados from "./pages/FolhaProducaoDados/FolhaProducaoDados";
import FolhaProduFront from "./pages/FolhaProducaoFront/FolhaProduFront";

import Container from "./layout/Container/Container";
import Navbar from "./layout/NavBar/NavBar";
import Footer from "./layout/Footer/Footer";

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
            <Route path="/folhaProducaoAudio" element={<FolhaProducaoAudio />} />
            <Route path="/folhaProducaoDados" element={<FolhaProducaoDados />} />
            <Route path="/folhaProduFront" element={<FolhaProduFront />} />
          </Routes>
        </Container>
        <Footer/>
      </Router>
  );
}

export default App;
