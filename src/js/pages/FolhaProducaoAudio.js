import { useState, useEffect } from "react";
import axios from "axios";

import styles from "../../css/FolhasDigitalizadas.module.css"

import AudioModal from "../projectForms/AudioModal";

function FolhaProducao() {
    
    const [selectedFolha, setSelectedFolha] = useState(null);
    const [folhas,setFolhas] = useState([]);
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
                const response = await axios.get("http://localhost:3001/jsonAudio/listAllFiles");
                console.log(response.data.files);
                
                const files = response.data.files;
                
                const folhaData = await Promise.all(
                    files.map(async (filePath)=>{
                        
                        let corrida = filePath.split('.')[0];
                        const jsonData = await axios.get(`http://localhost:3001/jsonAudio/findFile/${corrida}`)
                        console.log(jsonData.data);
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
            <h1>Áudios recebidos</h1>
            
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
                                    
                                    <tr key ={folha.corrida}>
                                        <td>{folha.corrida}</td>
                                        <td>{folha.produto}</td>
                                        <td>{folha.data}</td>
                                        <td>
                                            <button
                                                className={styles.button}
                                                onClick={()=>openModal(folha.corrida)}
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
                   <AudioModal
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