import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from "./pages/Home/Home";
import FolhaProducao from "./pages/FolhaProducao/FolhaProducao";
import FolhaProducaoAudio from "./pages/FolhaProducaoAudio/FolhaProducaoAudio";
import FolhaProducaoDados from "./pages/FolhaProducaoDados/FolhaProducaoDados";
import FolhaProduFront from "./pages/FolhaProducaoFront/FolhaProdcaoFront";

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
