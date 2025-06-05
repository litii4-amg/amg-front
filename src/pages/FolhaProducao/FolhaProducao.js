import { useState, useEffect } from "react";
import axios from "axios";

import styles from "./FolhaProducao.module.css"

import FolhaDigitalizadaModal from "../../components/FolhaDigitalizadaModal/FolhaDigitalizadaModal";

function FolhaProducao() {
    
    const [selectedFolha, setSelectedFolha] = useState(null);
    const [folhas,setFolhas] = useState([]);
    const [isFolhaModalOpen, setIsFolhaModalOpen] = useState(false);
    
    const openModal = (folha)=>{
        setSelectedFolha(folha);
        setIsFolhaModalOpen(true);
    }
    const closeModal = ()=>{
        setIsFolhaModalOpen(false);
        setSelectedFolha(null);
    }

    useEffect(() => {
        async function fetchFolhas() {
            try {
                const response = await axios.get("http://34.67.190.19:3001/jsonFolha/listAllFiles");
                console.log(response.data.files);
                
                const files = response.data.files;
                
                const folhaData = await Promise.all(
                    files.map(async (filePath)=>{
                        
                        let [ano, mes, corrida] = filePath.split('/'); 
                        corrida = corrida.split('.')[0];
                        console.log(corrida);
                        const jsonData = await axios.get(`http://34.67.190.19:3001/jsonFolha/findFile/${corrida}`)
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
                                    
                                    <tr key ={folha.extracted_data.corrida}>
                                        <td>{folha.extracted_data.corrida}</td>
                                        <td>{folha.extracted_data.produto}</td>
                                        <td>{folha.extracted_data.dataDeProducao}</td>
                                        <td>
                                            <button
                                                className={styles.button}
                                                onClick={()=>openModal(folha)}
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
                        folha={selectedFolha}
                   />
                </div>
            </div>
        </div>
    );
}

export default FolhaProducao;