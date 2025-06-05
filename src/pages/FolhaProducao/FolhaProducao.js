// FolhaProducao.js
import { useState, useEffect, useCallback } from "react"; // Adicione useCallback
import axios from "axios";

import styles from "./FolhaProducao.module.css";

import FolhaDigitalizadaModal from "../../components/FolhaDigitalizadaModal/FolhaDigitalizadaModal";
import FolhasTable from "../../components/FolhasTable/FolhasTable";

function FolhaProducao() {
  const [selectedFolha, setSelectedFolha] = useState(null);
  const [folhas, setFolhas] = useState([]);
  const [isFolhaModalOpen, setIsFolhaModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mova fetchFolhas para fora e envolva com useCallback
  const fetchFolhas = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://34.67.190.19:3001/jsonFolha/listAllFiles"
      );
      
      const files = response.data.files;
      if (!files || files.length === 0) {
          setFolhas([]);
          // Não precisa mais de setIsLoading(false) aqui, será feito no finally
          return; // Retorna cedo se não houver arquivos
      }
      
      const folhaPromises = files.map(async (filePath) => {
        let [, , corrida] = filePath.split('/');
        corrida = corrida.split('.')[0];
        try {
          const jsonData = await axios.get(
            `http://34.67.190.19:3001/jsonFolha/findFile/${corrida}`
          );
          return jsonData.data;
        } catch (individualError) {
          console.error(`Erro ao buscar dados da corrida ${corrida}:`, individualError);
          return null; 
        }
      });

      const results = await Promise.all(folhaPromises);
      const folhaData = results.filter(data => data !== null);
      setFolhas(folhaData);

    } catch (err) { // Renomeado para 'err' para não conflitar com o estado 'error'
      console.error("Erro ao carregar a lista de arquivos:", err);
      setError(err.message || "Ocorreu um erro ao buscar os dados. Tente novamente mais tarde.");
      setFolhas([]);
    } finally {
      setIsLoading(false); // Garante que o loading seja finalizado
    }
  }, []); // As dependências (setIsLoading, setError, setFolhas) são estáveis

  // useEffect para a carga inicial
  useEffect(() => {
    fetchFolhas();
  }, [fetchFolhas]); // Depende da função fetchFolhas memoizada

  const openModal = (folha) => {
    setSelectedFolha(folha);
    setIsFolhaModalOpen(true);
  };

  const closeModal = () => {
    setIsFolhaModalOpen(false);
    setSelectedFolha(null);
    fetchFolhas(); // <--- Chame fetchFolhas aqui para atualizar os dados!
  };

  return (
    <div className={styles.container}>
      <h1>Folhas Digitalizadas</h1>
      
      <div className={styles.section}>
        <div className={styles.section_1}>
          <FolhasTable
            folhas={folhas}
            onOpenModal={openModal}
            isLoading={isLoading}
            error={error}
          />
          <FolhaDigitalizadaModal
            isOpen={isFolhaModalOpen}
            onClose={closeModal} // Passando a nova closeModal
            folha={selectedFolha}
            // Se o modal precisar de uma forma de indicar que dados foram alterados,
            // você pode passar uma função de callback específica para isso
            // e chamar fetchFolhas apenas se essa callback indicar uma alteração.
            // Por ora, vamos assumir que sempre que fecha, pode ter havido alteração.
          />
        </div>
      </div>
    </div>
  );
}

export default FolhaProducao;