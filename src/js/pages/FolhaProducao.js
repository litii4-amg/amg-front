import { useState, useEffect } from "react";
import axios from "axios";

import styles from "../../css/FolhasDigitalizadas.module.css"

import FolhaDigitalizadaModal from "../projectForms/FolhaDigitalizadaModal";

function FolhaProducao() {
    
    const [selectedFolha, setSelectedFolha] = useState(null);
    const [folhas, setFolhas] = useState([]);
    const [isFolhaModalOpen, setIsFolhaModalOpen] = useState(false);
    
    const openModal = (corrida)=>{
        setSelectedFolha(corrida);
        setIsFolhaModalOpen(true);
    }
    const closeModal = ()=>{
        setIsFolhaModalOpen(false);
        setSelectedFolha(null);
    }

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
                                        <td>
                                            <button
                                                className={styles.button}
                                                onClick={()=>openModal(folha.Corrida)}
                                            >Visualizar</button>
                                        </td>
                                    </tr>
                                ))
                            ):(
                                <tr>
                                    <td colSpan="4">Nenhuma folha digitalizada</td>
                                </tr>
                            )}

                        </tbody>
                   </table>
                   <FolhaDigitalizadaModal
                        isOpen={isFolhaModalOpen}
                        onClose={closeModal}
                        numDaCorrida={selectedFolha}
                   />
                </div>
            </div>
        </div>
    );
}

export default FolhaProducao;