import React, { useState, useEffect } from "react";
import styles from "../../css/FolhaProducao.module.css";

function FolhaProducao() {
    const [data, setData] = useState({
        Corrida: "",
        OrdemdeProducao: "",
        DatadeProducao: "",
        Produto: "",
        ProducaoKG: ""
    });
    
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:5000/folhaProducao");
                const result = await response.json();
                const loadedData = result[0] || {};
                setData(prevData => ({
                    ...prevData,
                    ...loadedData
                }));
            } catch (error) {
                console.error("Erro ao carregar os dados:", error);
            }
        }
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Função para converter o formato de data
        const convertDateFormat = (dateString) => {
            const parts = dateString.split(" "); // Exemplo: '08 02 25'
            return `20${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`; // Formato 'YYYY-MM-DD'
        };
        
        const formattedDataInicio = convertDateFormat(data.DatadeProducao); // Converte a data
        const formattedDataFim = formattedDataInicio;  // Se você usar a mesma data para o início e fim
        
        const payload = {
            lote: data.OrdemdeProducao,  // Corrigido para enviar 'OrdemdeProducao' no campo 'lote'
            codOp: data.OrdemdeProducao, // Se for isso que você precisa, caso contrário altere
            data_inicio: formattedDataInicio,  // Usando a data formatada
            data_fim: formattedDataFim,  // Usando a mesma data formatada
            quantidade_produzida: data.ProducaoKG,
            quantidade_prevista: data.ProducaoKG  // Aqui você pode ajustar conforme os dados
        };
        
        console.log("Valores do formulário:", payload);
        
        try {
            const response = await fetch("http://localhost:3001/corrida/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload),
            });
    
            const text = await response.text(); 
            console.log("Corrida criada com sucesso:", text);
        
            try {
                const result = JSON.parse(text);  // Tentando parse do texto da resposta
                console.log("Corrida criada com sucesso:", result);
            } catch (parseError) {
                console.error("Erro ao tentar fazer parse da resposta JSON:", parseError);
            }
        
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
        }
    };
    

    return (
        <div className={styles.container}>
            <h1>Folha de Controle de Processo</h1>
            <div className={styles.section}>
                <form onSubmit={handleSubmit}>
                    <p><strong>Ordem de Produção:</strong> <input name="OrdemdeProducao" value={data.OrdemdeProducao} onChange={handleChange} /></p>
                    <p><strong>Corrida:</strong> <input name="Corrida" value={data.Corrida} onChange={handleChange} /></p>
                    <p><strong>Data de Produção:</strong> <input name="DatadeProducao" type="date" value={data.DatadeProducao} onChange={handleChange} /></p>
                    <p><strong>Produto:</strong> <input name="Produto" value={data.Produto} onChange={handleChange} /></p>
                    <p><strong>Produção (kg):</strong> <input name="ProducaoKG" value={data.ProducaoKG} onChange={handleChange} /></p>
                    <button type="submit">Submeter</button>
                </form>
            </div>
        </div>
    );
}

export default FolhaProducao;