import ReactDOM from 'react-dom';

import styles from './FolhaDigitalizadaModal.module.css';

import useFolhaData from '../../hooks/useFolhaData';

import SaveStatus from '../SaveStatus/SaveStatus';
import DataItem from '../DataItem/DataItem';

// ========================================================================
// COMPONENTE PRINCIPAL: FolhaDigitalizadaModal
// Responsabilidade: Orquestrar a UI, usar o hook de dados e renderizar
// os componentes filhos.
// ========================================================================
function FolhaDigitalizadaModal({ isOpen, onClose, folha }) {
  const { dados, editingField, setEditingField, saveStatus, handlers } = useFolhaData(folha);

  if (!isOpen || !folha?.extracted_data) return null;

  const { corrida, ordemDeProducao, produto } = folha.extracted_data;

  const modalContent = (
    <div className={styles.window}>
      <div className={styles.window_content}>
        <header className={styles.modal_header}>
          <SaveStatus status={saveStatus} />
          <button className={styles.close_button} onClick={onClose}>&times;</button>
        </header>

        <main className={styles.window_scrollable}>
          <h2>Folha da Corrida #{corrida}</h2>
          <p><strong>Ordem de Produção:</strong> {ordemDeProducao?.[1]}</p>
          <p><strong>Produto:</strong> {produto}</p>

          <h3>Outros Dados:</h3>
          <div className={styles.data_list}>
            {Object.entries(dados).map(([key, value]) => (
              <DataItem
                key={key}
                itemKey={key}
                value={value}
                editingField={editingField}
                setEditingField={setEditingField}
                handlers={handlers}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}

export default FolhaDigitalizadaModal;