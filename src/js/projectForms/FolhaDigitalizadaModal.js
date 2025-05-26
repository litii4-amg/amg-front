import {useState, useEffect} from 'react';
import axios from "axios";

import styles from './FolhaDigitalizadaModal.module.css'

function FolhaDigitalizadaModal({isOpen, onClose, numDaCorrida}){
    
    const [folhas, setFolhas] = useState([]);
    
    useEffect(()=>{
        
        if (isOpen && numDaCorrida){
            fetchFolhas(numDaCorrida);
        }

    }, [isOpen, numDaCorrida]);
    
    async function fetchFolhas(numCorrida) {
        
        try {
            const jsonData = await axios.get(`http://localhost:3001/jsonFolha/findFile/${numCorrida}`)
            setFolhas(jsonData.data);
        
        } catch (error) {
            console.error("Erro ao carregar os dados:", error);
        }
    }

    if (!isOpen) return null;
    
    return(
        <div className={styles.window}>
            <div className={styles.window_content}>
                 <button
                    className={styles.close_button}
                    onClick={onClose}>&times;
                </button>
                <h2>Detalhes da folha</h2>
            </div>
        </div>
    );
}

export default FolhaDigitalizadaModal;