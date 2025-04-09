import React, { useState, useEffect } from "react";
import axios from "axios";


import styles from "../../css/FolhaProducao.module.css"

function FolhaProducao() {
    
    const [data, setData] = useState({});
    
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://34.44.210.41:3001/jsonFolha/getJson");
                console.log(response.data[0].text);
                setData(response.data[0].text);
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
        
        // Dados para o serem salvos no banco de dados
        
        const payload = {
            Corrida: data.Corrida, 
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
    
        try{
            await axios.post("http://34.44.210.41:3001/jsonFolha/createFolhaUnificada", payload);
            alert("Dados salvos com sucesso!");
        }catch(error){
            console.error("Erro ao salvar os dados:", error);  
        }
    };

    return (
        <div className={styles.container}>
            <h1>Folha de Controle de Processo</h1>
            <div className={styles.section}>

                <div>
                    <p><strong>Ordem de Produção:</strong> <input name="OrdemdeProducao" value={data.OrdemdeProducao || ""} onChange={handleChange} /></p>
                    <p><strong>Corrida:</strong> <input name="Corrida" value={data.Corrida || ""} onChange={handleChange} /></p>
                    <p><strong>Data de Produção:</strong> <input name="DatadeProducao" type="date" value={data.DatadeProducao || ""} onChange={handleChange} /></p>
                    <p><strong>Produto:</strong> <input name="Produto" value={data.Produto || ""} onChange={handleChange} /></p>
                    <p><strong>Cliente:</strong> <input name="Cliente" value={data.Cliente || "Não especificado"} onChange={handleChange} /></p>
                    <p><strong>Operador Leito:</strong> <input name="OperadorLeito" value={data.OperadorLeito || ""} onChange={handleChange} /></p>
                    <p><strong>Operador Forno:</strong> <input name="OperadorForno" value={data.OperadorForno || ""} onChange={handleChange} /></p>
                    <p><strong>Líder:</strong> <input name="Lider" value={data.Lider || ""} onChange={handleChange} /></p>
                </div>

                <div className={styles.section_1}>
                    <table>
                        <thead>
                            <tr>
                                <th rowSpan="2">Leito</th>
                                <th colSpan="1">Fusão</th>
                                <th colSpan="5">Reação</th>
                            </tr>
                            <tr>
                                {data.Insumo?.map((insumo, index) => (
                                    <th key={index}>{insumo}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Peso (kg)</strong></td>
                                {data.PesoKG?.map((peso, index) => (
                                    <td key={index}>
                                        <input name={`PesoKG_${index}`} value={peso} onChange={handleChange} />
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td><strong>Nº Lote</strong></td>
                                {data.NLote?.map((lote, index) => (
                                    <td key={index}>
                                        <input name={`NLote_${index}`} value={lote} onChange={handleChange} />
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td><strong>Peso Real (kg)</strong></td>
                                <td><input name="PesoReal" value={data.PesoReal || ""} onChange={handleChange} /></td>
                                <td><input name="PesoReal" value={data.PesoReal || ""} onChange={handleChange} /></td>
                                <td><input name="PesoReal" value={data.PesoReal || ""} onChange={handleChange} /></td>
                                <td><input name="PesoReal" value={data.PesoReal || ""} onChange={handleChange} /></td>
                                <td><input name="PesoReal" value={data.PesoReal || ""} onChange={handleChange} /></td>
                                <td><input name="PesoReal" value={data.PesoReal || ""} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td><strong>Temperatura Al</strong></td>
                                <td colSpan="1"><input name="PesoReal" onChange={handleChange} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div className={styles.section_2}>
                    <table>
                        <thead>
                            <tr>
                                <th>Reação</th>
                                <th colSpan="3" >Forno: {data.FornoReac}</th>
                            </tr>
                            <tr>
                                <th>Etapa</th>
                                <th>Hora</th>
                                <th>Temperatura (°C)</th>
                                <th>Potência (KW)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Início Adição</td>
                                <td><input name="InicioAdicao" value={data.InicioAdicao || ""} onChange={handleChange} /></td>
                                <td><input name="InicioAdicaoTemp" value={data.InicioAdicaoTemp || ""} onChange={handleChange} /></td>
                                <td><input name="InicioAdicaoPot" value={data.InicioAdicaoPot || ""} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Fim Adição</td>
                                <td><input name="FimAdicao" value={data.FimAdicao || ""} onChange={handleChange} /></td>
                                <td><input name="FimAdicaoTemp" value={data.FimAdicaoTemp || ""} onChange={handleChange} /></td>
                                <td><input name="FimAdicaoPot" value={data.FimAdicaoPot || ""} onChange={handleChange} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div className={styles.section_4}>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan="2">Produção(kg)</th>
                            </tr>  
                        </thead>
                        <tbody>
                            <tr>
                                <td>Barra</td>
                                <td><input name="Barra" value={data.Barra || ""} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>WP</td>
                                <td><input name="WP" value={data.WP || ""} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Refusão</td>
                                <td><input name="Refusao" value={data.Refusao || ""} onChange={handleChange} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                {/* Seu código de inputs aqui */}
                <button type="submit">Enviar</button>
            </form>
        </div>
        
    );
}

export default FolhaProducao;