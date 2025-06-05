// ========================================================================
// HOOK CUSTOMIZADO: useFolhaData
// Responsabilidade: Centraliza toda a lógica de manipulação e salvamento
// dos dados da folha.
// ========================================================================

import { useState, useEffect, useCallback } from "react";

const DEBOUNCE_DELAY = 1000;

function useFolhaData(folha) {
  const [dados, setDados] = useState({});
  const [editingField, setEditingField] = useState({ key: null, index: null });
  const [saveStatus, setSaveStatus] = useState('idle'); // 'idle', 'changed', 'saving', 'saved', 'error'


  useEffect(() => {
    if (folha?.extracted_data) {
      const { corrida, ordemDeProducao, produto, ...rest } = folha.extracted_data;
      setDados(rest);
      setSaveStatus('saved'); // Inicia como salvo
    }
  }, [folha]);


  const salvarDados = useCallback(async (dadosParaSalvar) => {
    setSaveStatus('saving');
    console.log("Iniciando salvamento...");

    try {
      const requestBody = {
        extracted_data : {
        ...dadosParaSalvar,
        corrida: folha?.extracted_data?.corrida,
        }
      };
      
      console.log("Corpo da requisição:", requestBody);

      const response = await fetch(`http://34.67.190.19:3001/jsonFolha/editFile/${folha.extracted_data.corrida}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error('Falha na resposta da API');
      
      setSaveStatus('saved');
      console.log("Dados salvos com sucesso!");

    } catch (error) {
      setSaveStatus('error');
      console.error("Erro ao salvar os dados:", error);
    }
  }, [folha]);

  // Efeito de auto-salvamento com debounce
  useEffect(() => {
    // Só aciona o salvamento se houve uma mudança ('changed')
    if (saveStatus !== 'changed') {
      return;
    }
    
    const debounceTimer = setTimeout(() => {
      salvarDados(dados);
    }, DEBOUNCE_DELAY);

    // Função de limpeza para cancelar o timer se houver nova alteração
    return () => clearTimeout(debounceTimer);

  }, [dados, saveStatus, salvarDados]);

  // Agrupa todos os handlers (funções de manipulação)
  const handlers = {
    handleEditChange: (e, key, index = null) => {
      const novoValor = e.target.value;
      setDados(prev => {
        const novo = { ...prev };
        if (index === null) {
          novo[key] = novoValor;
        } else {
          novo[key] = [...prev[key]];
          novo[key][index] = novoValor;
        }
        return novo;
      });
      setSaveStatus('changed'); // Marca que houve alteração para o useEffect reagir
    },
    handleDelete: (key, index = null) => {
      if (!window.confirm(`Deseja remover o item?`)) return;
      setDados(prev => {
        const novo = { ...prev };
        if (index === null) {
          delete novo[key];
        } else {
          novo[key] = prev[key].filter((_, i) => i !== index);
        }
        return novo;
      });
      setSaveStatus('changed');
    },
    handleAddItem: (key) => {
      const currentArray = dados[key] || [];
      setDados(prev => ({
        ...prev,
        [key]: [...currentArray, '']
      }));
      setEditingField({ key, index: currentArray.length });
      setSaveStatus('changed');
    },
  };

  return { dados, editingField, setEditingField, saveStatus, handlers };
}



export default useFolhaData;