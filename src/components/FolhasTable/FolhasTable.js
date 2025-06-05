import React from "react";
import styles from "./FolhasTable.module.css"; // Vamos criar este arquivo CSS

function FolhasTable({ folhas, onOpenModal, isLoading, error }) {
  if (isLoading) {
    return <p className={styles.message}>Carregando folhas de produção...</p>;
  }

  if (error) {
    return <p className={`${styles.message} ${styles.error}`}>Erro ao carregar dados: {error}</p>;
  }

  if (folhas.length === 0) {
    return <p className={styles.message}>Nenhuma folha digitalizada encontrada.</p>;
  }

  return (
    <table className={styles.folhasTable}>
      <thead>
        <tr>
          <th>Corrida</th>
          <th>Produto</th>
          <th>Data</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {folhas.map((folha) => (
          <tr key={folha.extracted_data.corrida}>
            <td>{folha.extracted_data.corrida}</td>
            <td>{folha.extracted_data.produto}</td>
            <td>{folha.extracted_data.dataDeProducao}</td>
            <td>
              <button
                className={styles.button}
                onClick={() => onOpenModal(folha)}
              >
                Visualizar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FolhasTable;