import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../css/FolhaProducao.module.css";

function FolhaProducao() {

    const [data, setData] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(0);
    
    const currentData = data[selectedIndex] || {};

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://34.44.210.41:3001/jsonAudio/getJson");
                const rawData = response.data;
    
                // Mescla corrida com os dados seguintes
                const mergedData = [];
                for (let i = 0; i < rawData.length; i++) {
                    const current = rawData[i];
                    const next = rawData[i + 1];
    
                    if ("corrida" in current && next && !("corrida" in next)) {
                        const merged = {
                            ...next,
                            corrida: current.corrida,
                        };
                        mergedData.push(merged);
                        i++; // pula o próximo porque já foi usado
                    } else if (!("corrida" in current)) {
                        mergedData.push(current);
                    }
                }
    
                setData(mergedData);
                console.log("Dados mesclados:", mergedData);
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
    console.log("Dados:", currentData.corrida);
    console.log("Dados:", data);
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!data) {
            alert('Nenhum dado encontrado!'); 
            return;
        }

        const payload = {
            
            Corrida: currentData.corrida || data.NLote, 
            DatadeProducao: data.DatadeProducao || "", 
            CodBarras:  data[0].CodBarras || "",
            FimAdicao:  data[0].FimAdicao || "",
            FimAdicaoPot:  data[0].FimAdicaoPot || "",
            FimAdicaoTemp:  data[0].FimAdicaoTemp || "",
            FimElevacao:  data[0].FimElevacao || "",
            FimElevacaoPot:  data[0].FimElevacaoPot || "",
            FimElevacaoTemp:  data[0].FimElevacaoTemp || "",
            FimEspera:  data[0].FimEspera || "",
            FimEsperaPot:  data[0].FimEsperaPot || "",
            FimEsperaTemp:  data[0].FimEsperaTemp || "",
            FimLimpezaEspera:  data[0].FimLimpezaEspera || "",
            FimLimpezaReacao:  data[0].FimLimpezaReacao || "",
            FimVaz:  data[0].FimVaz || "",
            FimVazPot:  data[0].FimVazPot || "",
            FornoPrep:  data[0].FornoPrep || "",
            FornoReac:  data[0].FornoReac || "",
            InicioAdicao:  data[0].InicioAdicao || "",
            InicioAdicaoPot:  data[0].InicioAdicaoPot || "",
            InicioAdicaoTemp:  data[0].InicioAdicaoTemp || "",
            InicioElevacao:  data[0].InicioElevacao || "",
            InicioElevacaoPot:  data[0].InicioElevacaoPot || "",
            InicioElevacaoTemp:  data[0].InicioElevacaoTemp || "",
            InicioEspera:  data[0].InicioEspera || "",
            InicioEsperaPot:  data[0].InicioEsperaPot || "",
            InicioEsperaTemp:  data[0].InicioEsperaTemp || "",
            InicioLimpezaEspera:  data[0].InicioLimpezaEspera || "",
            InicioLimpezaReacao:  data[0].InicioLimpezaReacao || "",
            InicioVaz:  data[0].InicioVaz || "",
            InicioVazPot:  data[0].InicioVazPot || "",
            InicioVazTemp:  data[0].InicioVazTemp || "",
            Insumo:  data[0].Insumo || "",
            NLote:  data[0].NLote  || "",
            OrdemdeProducao:  data[0].OrdemdeProducao || "",
            PesoKG:  data[0].PesoKG || "",
            Lider: currentData.lider || "",
            OperadorForno: currentData.operador_forno || "",
            OperadorLeito: data[0].OperadorLeito || "",
            PesoReal: data[0].PesoReal || "",
            ProducaoKG: data[0].ProducaoKG || "",
            Produto: data[0].Produto || "",
            RoteiroProcesso: data[0].RoteiroProcesso || ""
        };
        
        console.log("Valores do formulário:", payload);
        
        try {
            await axios.post("http://34.44.210.41:3001/jsonFolha/createFolhaUnificada", payload);
            alert("Dados salvos com sucesso!");
            await axios.delete("http://34.44.210.41:3001/jsonAudio/clearJson");
        } catch (error) {
            console.error("Erro ao salvar os dados:", error);
        }
    };
    
    
    
    return (
        <div >
            <h1>Audios</h1>
            {/* {data.length > 0 && (
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
            )} */}
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