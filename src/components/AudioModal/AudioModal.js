import {useState, useEffect} from 'react';
import axios from "axios";

import styles from './AudioModal.module.css'

function AudioModal({isOpen, onClose, numDaCorrida}){
    
    const [folhas, setFolhas] = useState([]);
    
    useEffect(()=>{
        
        if (isOpen && numDaCorrida){
            fetchFolhas(numDaCorrida);
        }

    }, [isOpen, numDaCorrida]);
    
    async function fetchFolhas(numCorrida) {
        
        try {
            const jsonData = await axios.get(`http://localhost:3001/jsonAudio/findFile/${numCorrida}`)
            console.log(jsonData.data);
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
                <h2>Detalhes do áudio</h2>
                
                {Object.entries(folhas).map(([key, value]) =>(

                    <p key={key}>
                        <strong>{key}:</strong>
                        {Array.isArray(value)? value.join(", ") : value}
                    </p>
                ))}
            
            </div>        
        </div>
    );
}

export default AudioModal;