import { useState, useEffect } from "react";

function Pedido() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5000/pedidos")
      .then((response) => response.json())
      .then((data) => setPedidos(data))
      .catch((error) => console.error("Erro ao buscar pedidos:", error));
  }, []);

  return (
    <div>
      <h1>Pedidos</h1>
      <ul>
        {pedidos.map((pedido) => (
          <li key={pedido.cod}>
            <strong>Cliente:</strong> {pedido.cliente.nome} ({pedido.cliente.estado})<br />
            <strong>Data:</strong> {pedido.data}<br />
            <strong>Quantidade:</strong> {pedido.quantidade}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pedido;