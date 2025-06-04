import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import styles from './FolhaDigitalizadaModal.module.css';

function FolhaDigitalizadaModal({ isOpen, onClose, folha }) {
  const [dados, setDados] = useState({});
  const [editingField, setEditingField] = useState({ key: null, index: null });

  useEffect(() => {
    if (folha?.extracted_data) {
      const { corrida, ordemDeProducao, produto, ...rest } = folha.extracted_data;
      setDados(rest);
    }
  }, [folha]);

  if (!isOpen || !folha?.extracted_data) return null;

  const { corrida, ordemDeProducao, produto } = folha.extracted_data;

  const handleEdit = (key, index = null) => {
    setEditingField({ key, index });
  };

  const handleEditChange = (e, key, index = null) => {
    const novoValor = e.target.value;
    setDados((prev) => {
      const novo = { ...prev };
      if (index === null) {
        novo[key] = novoValor;
      } else {
        const novoArray = [...(novo[key] || [])];
        novoArray[index] = novoValor;
        novo[key] = novoArray;
      }
      return novo;
    });
  };

  const handleDelete = (key, index = null) => {
    if (window.confirm(`Deseja remover "${key}"?`)) {
      setDados((prev) => {
        const novo = { ...prev };
        if (index === null) {
          delete novo[key];
        } else {
          const novoArray = [...(novo[key] || [])];
          novoArray.splice(index, 1);
          novo[key] = novoArray;
        }
        return novo;
      });
    }
  };

  const handleAddItem = (key) => {
    setDados((prev) => {
      const novo = { ...prev };
      const novoArray = [...(prev[key] || [])];
      novoArray.push('');
      novo[key] = novoArray;
      return novo;
    });
    setEditingField({ key, index: dados[key]?.length || 0 }); 

const modalContent = (
  <div className={styles.window}>
    <div className={styles.window_content}>
      <div className={styles.window_scrollable}>
        <div style={{ display: 'flex' }}>
          <button className={styles.close_button} onClick={onClose}>
            &times;
          </button>
        </div>

        <h2>Folha da Corrida #{corrida}</h2>
        <p><strong>Ordem de Produção:</strong> {ordemDeProducao?.[1]}</p>
        <p><strong>Produto:</strong> {produto}</p>

        <h3>Outros Dados:</h3>
        <div className={styles.data_list}>
          {Object.entries(dados).map(([key, value]) => (
            <div key={key} className={styles.data_item}>
              <div className={styles.data_text}>
                <strong>{key}:</strong>
                {Array.isArray(value) ? (
                  <ul className={styles.subitem_list}>
                    {value.map((item, index) => (
                      <li key={index}>
                        {editingField.key === key && editingField.index === index ? (
                          <input
                            autoFocus
                            value={item}
                            onChange={(e) => handleEditChange(e, key, index)}
                            onBlur={() => setEditingField({ key: null, index: null })}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') setEditingField({ key: null, index: null });
                            }}
                          />
                        ) : (
                          <span className={styles.subitem_text}>• {item}</span>
                        )}
                        <div className={styles.subitem_actions}>
                          <button onClick={() => handleEdit(key, index)}><FaEdit /></button>
                          <button onClick={() => handleDelete(key, index)}><FaTrash /></button>
                        </div>
                      </li>
                    ))}
                    <li>
                      <button className={styles.add_button} onClick={() => handleAddItem(key)}>
                        <FaPlus /> Adicionar item
                      </button>
                    </li>
                  </ul>
                ) : (
                  editingField.key === key && editingField.index === null ? (
                    <input
                      autoFocus
                      value={value}
                      onChange={(e) => handleEditChange(e, key)}
                      onBlur={() => setEditingField({ key: null, index: null })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') setEditingField({ key: null, index: null });
                      }}
                    />
                  ) : (
                    <span className={styles.subitem_text}> {value}</span>
                  )
                )}
              </div>
              {!Array.isArray(value) && (
                <div className={styles.data_actions}>
                  <button onClick={() => handleEdit(key)}><FaEdit /></button>
                  <button onClick={() => handleDelete(key)}><FaTrash /></button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

  return ReactDOM.createPortal(modalContent, document.body);
}

export default FolhaDigitalizadaModal;
