import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./FolhaProducaoFront.module.css"

function FolhaProducao() {
    
    const [folhas,setFolhas] = useState([]);
    
    const [data, setData] = useState({
        Insumos: [],       // nomes dos insumos (para título das colunas)
        PesoKG: [],
        NLote: [],
        PesoReal: []
    });
    
    
    useEffect(() => {

        async function fetchFolhas() {
            try {
                const response = await axios.get("http://34.67.190.19:3001/jsonAudio/findFile/1233223234");
                console.log(response.data);
                setFolhas(response.data);

            } catch (error) {
                console.error("Erro ao carregar os dados:", error);
            }
        }
        fetchFolhas();
    }, []);

    const handleInsumoChange = (index, field, value) => {
        const updatedInsumos = [...data.Insumos];
        updatedInsumos[index][field] = value;
        setData(prevData => ({
            ...prevData,
            Insumos: updatedInsumos
        }));
    };

    const addInsumo = () => {
        setData(prevData => ({
            ...prevData,
            Insumos: [...(prevData.Insumos || []), ""],
            PesoKG: [...(prevData.PesoKG || []), ""],
            NLote: [...(prevData.NLote || []), ""],
            PesoReal: [...(prevData.PesoReal || []), ""]
        }));
    };

    const handleInsumoNomeChange = (index, value) => {
        const updated = [...data.Insumos];
        updated[index] = value;
        setData(prevData => ({ ...prevData, Insumos: updated }));
    };
    
    const handleArrayChange = (field, index, value) => {
        const updated = [...data[field]];
        updated[index] = value;
        setData(prevData => ({ ...prevData, [field]: updated }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFolhas(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let corridaAtual = parseInt(folhas.corrida, 10);
        if (isNaN(corridaAtual)) corridaAtual = 0;  // segurança
        const novaCorrida = corridaAtual + 1;
        // Dados para o serem salvos no banco de dados
        
        const payload = {
            corrida: 1233223234, 
            produto:"Tibal 5/1",
            codigoDeBarras: "L: 0820,0kg T: 0021,0kg - TER 04/03/25 10:02:",
            dataDeProducao: " ", 
            operador: " ",
            lider: " ",
            Inicio1ReacaoHora : " ",
            Inicio1ReacaoTemp :  " ",
            Inicio1ReacaoPot :  " ",
            Ret1CriolitaHora :  " ",
            Ret1CriolitaTemp :  " ",
            Ret1CriolitaPot :  " ",
            Inicio2ReacaoHora :  " ",
            Inicio2ReacaoTemp :  " ",
            Inicio2ReacaoPot :  " ",
            Ret2CriolitaHora :  " ",
            Ret2CriolitaTemp :  " ",
            Ret2CriolitaPot :  " ",
            Inicio3ReacaoHora :  " ",
            Inicio3ReacaoTemp :  " ",
            Inicio3ReacaoPot :  " ",
            Inicio4ReacaoHora :  " ",
            Inicio4ReacaoTemp :  " ",
            Inicio4ReacaoPot :  " ",
            Ret4CriolitaHora :  " ",
            Ret4CriolitaTemp :  " ",
            Ret4CriolitaPot :  " ",
            TempFinalHora :  " ",
            TempFinalTemp :  " ",
            TempFinalPot :  " ",
            barra :  " ",
            rod :  " ",
            refusao :  " ",
            criolita :  " ",
            wp :  " ",
            PesoRealFusaoAluminio :  " ",
            PesoRealReacaoAluminio :  " ",
            PesoRealKBF4 :  " ",
            PesoRealKzTIF6 :  " ",
            PesoRealVzO5 :  " ",
            PesoRealAlumina :  " ",
            PesoRealFluxoAnteligas :  " ",
            PesoRealAluminioP15 :  " "
        };

        console.log(payload);
        try{
            await axios.post("http://34.67.190.19:3001/jsonAudio/uploadJson", payload);
            alert("Dados salvos com sucesso!");

            window.location.reload();
        }catch(error){
            console.error("Erro ao salvar os dados:", error);  
        }
    };

    return (
        <div className={styles.container}>
            <h1>Folha de Controle de Processo</h1>
            <div className={styles.section}>

                <div>
                    <p><strong>Ordem de Produção:</strong> <input name="OrdemdeProducao" value={folhas.OrdemdeProducao || ""} onChange={handleChange} /></p>
                    <p><strong>Corrida:</strong> <input name="Corrida" value={folhas.corrida || ""} onChange={handleChange} /></p>
                    <p><strong>Data de Produção:</strong> <input name="data" value={folhas.data || ""} onChange={handleChange} /></p>
                    <p><strong>Produto:</strong> <input name="Produto" value={folhas.produto || ""} onChange={handleChange} /></p>
                    <p><strong>Cliente:</strong> <input name="cliente" value={folhas.cliente || "Não especificado"} onChange={handleChange} /></p>
                    <p><strong>Operador Leito:</strong> <input name="operador" value={folhas.operador || ""} onChange={handleChange} /></p>
                    <p><strong>Operador Forno:</strong> <input name="operadorForno" value={folhas.operadorForno || ""} onChange={handleChange} /></p>
                    <p><strong>Líder:</strong> <input name="lider" value={folhas.lider || ""} onChange={handleChange} /></p>
                </div>
                <button type="button" onClick={addInsumo}>Adicionar Número Lote e Peso Real</button>
                
                <div className={styles.section_1}>
                    <table>
                        <thead>
                            <tr>
                                <th>Leito</th>
                                <th>004 - 00010681 Fusão-Alumínio P1020</th>
                                <th>007 - 00010681 Reação-Alumínio P1020</th>
                                <th>010 - 00010676 KBF4</th>
                                <th>011 - 00002581 K2TiF6</th>
                                <th>058 - 00010680 V2O5</th>
                                <th>060 - 00001044 Aluminia</th>
                                <th>063 - 00011217 Fluxo Anteligas</th>
                                <th>065 - 0001105X Preparação Alumínio P15</th>
                            </tr>

                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <strong>Peso (kg)</strong>
                                </td>
                                <td>400,00</td>
                                <td>600,00</td>
                                <td>148,00</td>
                                <td>320,00</td>
                                <td>1,80</td>
                                <td>5,00</td>
                                <td>5,00</td>
                                <td>300,00</td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Nº Lote</strong>
                                </td>
                                <td><input name="Nlote1" value={folhas.Nlote1||""} onChange={handleChange} /></td>
                                <td><input name="Nlote2" value={folhas.Nlote2||""} onChange={handleChange} /></td>
                                <td><input name="Nlote3" value={folhas.Nlote3||""}onChange={handleChange} /></td>
                                <td><input name="Nlote4" value={folhas.Nlote4||""}onChange={handleChange} /></td>
                                <td><input name="Nlote5" value={folhas.Nlote5||""}onChange={handleChange} /></td>
                                <td><input name="Nlote6" value={folhas.Nlote6||""}onChange={handleChange} /></td>
                                <td><input name="Nlote7" value={folhas.Nlote7||""}onChange={handleChange} /></td>
                                <td><input name="Nlote8" value={folhas.Nlote8||""}onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Peso Real (kg)</strong>
                                </td>
        
                                <td><input name="PesoRealFusaoAluminio" value={folhas.PesoRealFusaoAluminio || ""} onChange={handleChange} /></td>
                                <td><input name="PesoRealReacaoAluminio" value={folhas.PesoRealReacaoAluminio || ""} onChange={handleChange} /></td>
                                <td><input name="PesoRealKBF4" value={folhas.PesoRealKBF4 || ""} onChange={handleChange} /></td>
                                <td><input name="PesoRealKzTIF6" value={folhas.PesoRealKzTIF6 || ""} onChange={handleChange} /></td>
                                <td><input name="PesoRealVzO5" value={folhas.PesoRealVzO5 || ""} onChange={handleChange} /></td>
                                <td><input name="PesoRealAlumina" value={folhas.PesoRealAlumina || ""} onChange={handleChange} /></td>
                                <td><input name="PesoRealAlumina"value={folhas.PesoRealFluxoAnteligas || ""} onChange={handleChange} /></td>
                                <td><input name="PesoRealAlumina"value={folhas.PesoRealAluminioP15 || ""} onChange={handleChange} /></td>
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
                                <th>Potência (Kw)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Início 1º Reação</td>
                                <td><input name="Inicio1ReacaoHora" value={folhas.Inicio1ReacaoHora || ""} onChange={handleChange} /></td>
                                <td><input name="Inicio1ReacaoTemp" value={folhas.Inicio1ReacaoTemp || ""} onChange={handleChange} /></td>
                                <td><input name="Inicio1ReacaoPot" value={folhas.Inicio1ReacaoPot || ""} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Ret 1º Criolita</td>
                                <td><input name="Ret1CriolitaHora" value={folhas.Ret1CriolitaHora || ""} onChange={handleChange} /></td>
                                <td><input name="Ret1CriolitaTemp" value={folhas.Ret1CriolitaTemp || ""} onChange={handleChange} /></td>
                                <td><input name="Ret1CriolitaPot" value={folhas.Ret1CriolitaPot || ""} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Início 2º Reação</td>
                                <td><input name="Inicio2ReacaoHora" value={folhas.Inicio2ReacaoHora || ""} onChange={handleChange} /></td>
                                <td><input name="Inicio2ReacaoTemp" value={folhas.Inicio2ReacaoTemp || ""} onChange={handleChange} /></td>
                                <td><input name="Inicio2ReacaoPot" value={folhas.Inicio2ReacaoPot || ""} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Ret 2º Criolita</td>
                                <td><input name="Ret2CriolitaHora" value={folhas.Ret2CriolitaHora || ""} onChange={handleChange} /></td>
                                <td><input name="Ret2CriolitaTemp" value={folhas.Ret2CriolitaTemp || ""} onChange={handleChange} /></td>
                                <td><input name="Ret2CriolitaPot" value={folhas.Ret2CriolitaPot || ""} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Início 3º Reação</td>
                                <td><input name="Inicio3ReacaoHora" value={folhas.Inicio3ReacaoHora || ""} onChange={handleChange} /></td>
                                <td><input name="Inicio3ReacaoTemp" value={folhas.Inicio3ReacaoTemp || ""} onChange={handleChange} /></td>
                                <td><input name="Inicio3ReacaoPot" value={folhas.Inicio3ReacaoPot || ""} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Início 4º Reação</td>
                                <td><input name="Inicio4ReacaoHora" value={folhas.Inicio4ReacaoHora || ""} onChange={handleChange} /></td>
                                <td><input name="Inicio4ReacaoTemp" value={folhas.Inicio4ReacaoTemp || ""} onChange={handleChange} /></td>
                                <td><input name="Inicio4ReacaoPot" value={folhas.Inicio4ReacaoPot || ""} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Ret 4º Criolita</td>
                                <td><input name="Ret4CriolitaHora" value={folhas.Ret4CriolitaHora || ""} onChange={handleChange} /></td>
                                <td><input name="Ret4CriolitaTemp" value={folhas.Ret4CriolitaTemp || ""} onChange={handleChange} /></td>
                                <td><input name="Ret4CriolitaPot" value={folhas.Ret4CriolitaPot || ""} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Temp.Final</td>
                                <td><input name="TempFinalHora" value={folhas.TempFinalHora || ""} onChange={handleChange} /></td>
                                <td><input name="TempFinalTemp" value={folhas.TempFinalTemp || ""} onChange={handleChange} /></td>
                                <td><input name="TempFinalPot" value={folhas.TempFinalPot || ""} onChange={handleChange} /></td>
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
                                <td><input name="barra" value={folhas.barra || ""} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Rod</td>
                                <td><input name="rod" value={folhas.rod || ""} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Refusão</td>
                                <td><input name="refusao" value={folhas.refusao || ""} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Criolita</td>
                                <td><input name="criolita" value={folhas.criolita || ""} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>WP</td>
                                <td><input name="wp" value={folhas.wp || ""} onChange={handleChange} /></td>
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