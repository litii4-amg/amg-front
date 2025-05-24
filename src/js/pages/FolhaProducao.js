import { useState, useEffect } from "react";
import axios from "axios";

import styles from "../../css/FolhasDigitalizadas.module.css"

function FolhaProducao() {
    
    const [folhas, setFolhas] = useState([]);
    
    //so um detalhe que fazer antes de realizar o get para pegar os dados é que minha api busca é por corrida e a corrida esta presente no nome do arquivo '2025/Abril/dia-08/00001823335.json', que é o número.
    useEffect(() => {
        async function fetchFolhas() {
            try {
                const response = await axios.get("http://localhost:3001/jsonFolha/listAllFiles");
                console.log(response.data.files);
                
                const files = response.data.files;
                
                const folhaData = await Promise.all(
                    files.map(async (filePath)=>{
                        
                        let [ano, mes, dia, corrida] = filePath.split('/'); 
                        corrida = corrida.split('.')[0];
                        console.log(corrida);
                        const jsonData = await axios.get(`http://localhost:3001/jsonFolha/findFile/${corrida}`)
                        return jsonData.data
                    })
                );

                setFolhas(folhaData);
            } catch (error) {
                console.error("Erro ao carregar os dados:", error);
            }
        }
        fetchFolhas();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Folhas Digitalizadas</h1>
            
            <div className={styles.section}>
                <div className={styles.section_1}>
                   <table>
                        <thead>
                            <tr>
                                <th>Corrida</th>
                                <th>Produto</th>
                                <th>Data</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {folhas.length > 0 ? (
                                folhas.map((folha)=>(
                                    <tr key ={folha.Corrida}>
                                        <td>{folha.Corrida}</td>
                                        <td>{folha.Produto}</td>
                                        <td>{folha.DatadeProducao}</td>
                                    </tr>
                                ))
                            ):(
                                <tr>
                                    <td colSpan="4">Nenhuma folha digitalizada</td>
                                </tr>
                            )}

                        </tbody>
                   </table>
                </div>
            </div>
        </div>
        
    );
}

export default FolhaProducao;