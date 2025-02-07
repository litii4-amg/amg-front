import {useState, useEffect} from "react";

function Lote() {
  const[lotes, setLotes] = useState([]);

  useEffect(()=>{

    fetch("http://localhost:5000/lotes")
    .then((response)=> response.json())
    .then((data)=> setLotes(data))
    .catch((error)=>console.error("Erro ao buscar lotes:", error));
  },[]);
  
  return (
    <div>
      <h1>Lotes</h1>
      <ul>
        {lotes.map((lote) => (
          <li key={lote.cod}>
            <strong>Produto:</strong> {lote.produto.nome} ({lote.produto.composicao})<br />
            <strong>Quantidade:</strong> {lote.quantidade}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lote;