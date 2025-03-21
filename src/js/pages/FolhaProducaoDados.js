import React, { useState, useEffect } from "react";
import axios from "axios";

function FolhaProducaoDados() {
    
    const [data, setData] = useState({});

    useEffect(() => {
        async function fetchData(){
            try{

                const response = await axios.get("http://localhost:3001/jsonFolha/getJson");
                //console.log(response.data[0].folhaProducao);
                setData(response.data[0].folhaProducao);
            }catch(error){
                console.error("Erro ao carregar os dados:", error);
            }
        }
        fetchData();
    }, []);
    
    const handleSave = async () => {
        
        if(!data){
            
            alert('Nenhum dado encontrado!'); 
            return;
        } 

        const convertDateFormat = (dateString) => {
            const parts = dateString.split(" "); // Exemplo: '08 02 25'
            return `20${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`; // Formato 'YYYY-MM-DD'
        };
        
        const formattedDataInicio = convertDateFormat(data.DatadeProducao); // Converte a data
        const formattedDataFim = formattedDataInicio;  // Se você usar a mesma data para o início e fim
        
        console.log(formattedDataInicio);
        
        const payload = {
            cod: data.Corrida,
            codOp:"24904401001",
            lote:"10211967",
            data_inicio: formattedDataInicio,
            data_fim: formattedDataFim,
            quantidade_produzida: data.ProducaoKG,
            quantidade_prevista:"0"
        };
        
        //console.log(payload);
        try{
            await axios.post("http://localhost:3001/jsonFolha/createFolhaCorrida", payload);
            alert("Dados salvos com sucesso!");
        }catch(error){
            console.error("Erro ao salvar os dados:", error);
        }
    }

    return (
        <div>
            <h1>Dados Escaneados</h1>
            <div>
                {Object.entries(data).map(([key, value]) => (
                    <p key={key}><strong>{key}:</strong> {Array.isArray(value) ? value.join(", ") : value}</p>
                ))}
            </div>

            <button onClick={handleSave}>Salvar</button>
        </div>
    );
}

export default FolhaProducaoDados;