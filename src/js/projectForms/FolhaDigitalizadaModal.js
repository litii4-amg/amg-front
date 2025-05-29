import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from './FolhaDigitalizadaModal.module.css';

function FolhaDigitalizadaModal({ isOpen, onClose, folha }) {
  const [dados, setDados] = useState({});

  useEffect(() => {
    if (folha?.extracted_data) {
      const { corrida, ordemDeProducao, produto, ...rest } = folha.extracted_data;
      setDados(rest);
    }
  }, [folha]);

  if (!isOpen || !folha?.extracted_data) return null;

  const { corrida, ordemDeProducao, produto } = folha.extracted_data;

  const handleEdit = (key) => {
    const novoValor = prompt(`Editar valor de "${key}":`, dados[key]);
    if (novoValor !== null) {
      setDados((prev) => ({ ...prev, [key]: novoValor }));
    }
  };

  const handleDelete = (key) => {
    if (window.confirm(`Deseja remover "${key}"?`)) {
      setDados((prev) => {
        const novo = { ...prev };
        delete novo[key];
        return novo;
      });
    }
  };

  const modalContent = (
    <div className={styles.window}>
      <div className={styles.window_content}>
        <button className={styles.close_button} onClick={onClose}>
          &times;
        </button>
        <h2>Folha da Corrida #{corrida}</h2>
        <p><strong>Ordem de Produção:</strong> {ordemDeProducao?.[1]}</p>
        <p><strong>Produto:</strong> {produto}</p>

        <h3>Outros Dados:</h3>
        <div className={styles.data_list}>
          {console.log(dados)}
          {Object.entries(dados).map(([key, value]) => (
            <div key={key} className={styles.data_item}>
              <div className={styles.data_text}>
                <strong>{key}:</strong> {Array.isArray(value) ? value.join(', ') : value}
              </div>
              <div className={styles.data_actions}>
                <button onClick={() => handleEdit(key)}><FaEdit /></button>
                <button onClick={() => handleDelete(key)}><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}

export default FolhaDigitalizadaModal;
