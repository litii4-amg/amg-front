import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../css/FolhaProducao.module.css";

function FolhaProducao() {

    const [data, setData] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://34.44.210.41:3001/jsonAudio/getJson");
                console.log(response.data);
                setData(response.data);
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

    const handleDropdownChange = (e) => {
        setSelectedIndex(Number(e.target.value));
    };

    const renderValue = (value) => {
        if (typeof value === "object" && value !== null) {
            return (
                <ul>
                    {Object.entries(value).map(([k, v]) => (
                        <p key={k}>
                            <strong>{k}:</strong> 
                            {Array.isArray(v) ? v.join(", ") : v.toString()}
                        </p>
                    ))}
                </ul>
            );
        }
        return value;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!data) {
            alert('Nenhum dado encontrado!'); 
            return;
        }

        const payload = {
            lote: data.OrdemdeProducao,  // Corrigido para enviar 'OrdemdeProducao' no campo 'lote'
            codOp: data.OrdemdeProducao, // Se for isso que você precisa, caso contrário altere  // Usando a mesma data formatada
            quantidade_produzida: data.ProducaoKG,
            quantidade_prevista: data.ProducaoKG  // Aqui você pode ajustar conforme os dados
        };
        
        console.log("Valores do formulário:", payload);
        
        try {
            await axios.post("http://localhost:3001/jsonFolha/createFolhaUnificada", payload);
            alert("Dados salvos com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar os dados:", error);
        }
    };
    
    const currentData = data[selectedIndex] || {};
    
    return (
        <div >
            <h1>Audios</h1>
            {data.length > 0 && (
                <div>
                    <label htmlFor="audioSelect"><strong>Selecionar Áudio:</strong></label>
                    <select id="audioSelect" onChange={handleDropdownChange} value={selectedIndex}>
                        {data.map((item, index) => (
                            <option key={index} value={index}>
                                Áudio {index + 1} - {item.metadata?.timestamp || "Sem data"}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <div>
                {Object.entries(currentData).map(([key, value]) => {
                    if (key === "metadata") return null;

                    return (
                        <p key={key}>
                            <strong>{key}:</strong> {renderValue(value)}
                        </p>
                    );
                })}
            </div>

            <form onSubmit={handleSubmit}>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default FolhaProducao;