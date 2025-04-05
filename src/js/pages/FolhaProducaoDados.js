import React, { useState, useEffect } from "react";
import axios from "axios";

function FolhaProducaoDados() {
    
    const [data, setData] = useState({});

    useEffect(() => {
        async function fetchData(){
            try{

                const response = await axios.get("http://34.44.210.41:3001/jsonFolha/getJson");
                console.log(response.data[0].text);
                setData(response.data[0].text);
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
            Corrida: data.Corrida || data.NLote, 
            DatadeProducao: data.DatadeProducao, 
            CodBarras: data.CodBarras,
            FimAdicao: data.FimAdicao,
            FimAdicaoPot: data.FimAdicaoPot,
            FimAdicaoTemp: data.FimAdicaoTemp,
            FimElevacao: data.FimElevacao ,
            FimElevacaoPot: data.FimElevacaoPot,
            FimElevacaoTemp: data.FimElevacaoTemp,
            FimEspera: data.FimEspera,
            FimEsperaPot: data.FimEsperaPot,
            FimEsperaTemp: data.FimEsperaTemp,
            FimLimpezaEspera: data.FimLimpezaEspera,
            FimLimpezaReacao: data.FimLimpezaReacao,
            FimVaz: data.FimVaz,
            FimVazPot: data.FimVazPot,
            FornoPrep: data.FornoPrep,
            FornoReac: data.FornoReac,
            InicioAdicao: data.InicioAdicao,
            InicioAdicaoPot: data.InicioAdicaoPot,
            InicioAdicaoTemp: data.InicioAdicaoTemp,
            InicioElevacao: data.InicioElevacao,
            InicioElevacaoPot: data.InicioElevacaoPot,
            InicioElevacaoTemp: data.InicioElevacaoTemp,
            InicioEspera: data.InicioEspera,
            InicioEsperaPot: data.InicioEsperaPot,
            InicioEsperaTemp: data.InicioEsperaTemp,
            InicioLimpezaEspera: data.InicioLimpezaEspera,
            InicioLimpezaReacao: data.InicioLimpezaReacao,
            InicioVaz: data.InicioVaz,
            InicioVazPot: data.InicioVazPot,
            InicioVazTemp: data.InicioVazTemp,
            Insumo: data.Insumo,
            NLote: data.NLote ,
            OrdemdeProducao: data.OrdemdeProducao,
            PesoKG: data.PesoKG,
            Lider: data.Lider,
            OperadorForno: data.OperadorForno,
            OperadorLeito: data.OperadorLeito,
            PesoReal: data.PesoReal,
            ProducaoKG: data.ProducaoKG,
            Produto: data.Produto,
            RoteiroProcesso: data.RoteiroProcesso
        };
        
        //console.log(payload);
        try{
            await axios.post("http://localhost:3001/jsonFolha/createFolhaUnificada", payload);
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

//Salvar um timestamp no banco de dados para checkar o tempo de resposta do servidor