import React, { useState, useEffect } from 'react';

import styles from './ProdutoModal.module.css';

function ProdutividadeModal({ isOpen, onClose, produtividadeID }) {
    
    const [produtividadeList, setProdutividadeList] = useState([]);
    
    useEffect(() => {
        if (isOpen && produtividadeID) {
            fetchProdutividade(produtividadeID);
        } else{
            setProdutividadeList([{ Data: "", Produto: "", Op: "", Lote: "", Kg: "", Forno: "", Operador: "", HoraInicio: "", HoraFim: "", Duracao: "" }]);
        }
        
    },[isOpen, produtividadeID]);
    
    useEffect(() => {
        console.log("Produto List Atualizado:", produtividadeList);
    }, [produtividadeList]);

    const fetchProdutividade = async (id) => {
        try {
            console.log("ID:", id);
            const response = await fetch(`http://localhost:3001/produtividade/produto/${id}`);
            const data = await response.json();
            
            console.log(data);
            setProdutividadeList(data);
            
        } catch (error) {
            console.error("Erro ao carregar os produtos:", error);
        }
    };

    if (!isOpen) return null;
    
    return (
        <div className={styles.window}>
            <div className={styles.window_content}>
                <button
                    className={styles.close_button}
                    onClick={onClose}>&times;           
                </button>

                <h2>Detalhes da Produtividade</h2>

                <div>

                    {produtividadeList.map((produtividade, index) => (
                        <div key={produtividade.Produto || index } className={styles.form_group}>
                            <label>Data:</label>
                            <span>{produtividade.Data}</span>
                            
                            <div className={styles.form_group}>
                                <label>Produto:</label>
                                <span>{produtividade.Produto}</span>
                            </div>

                            <div className={styles.form_group}>
                                <label>Op:</label>
                                <span>{produtividade.Op}</span>
                            </div>
                            
                            <div className={styles.form_group}>
                                <label>Lote:</label>
                                <span>{produtividade.Lote}</span>
                            </div>
                            
                            <div className={styles.form_group}>
                                <label>Kg:</label>
                                <input type='text' name = "Kg" defaultValue={produtividade.Kg}/>
                            </div>
                            
                            <div className={styles.form_group}>
                                <label>Forno:</label>
                                <input type='text' name = "Forno" defaultValue={produtividade.Forno}/>
                            </div>
                            
                            <div className={styles.form_group}>
                                <label>Operador:</label>
                                <input type='text' name = "Operador" defaultValue={produtividade.Operador}/>
                            </div>
                            
                            <div className={styles.form_group}>
                                <label>Hora Inicio:</label>
                                <input type='text' name = "HoraInicio" defaultValue={produtividade.HoraInicio}/>
                            </div>
                            
                            <div className={styles.form_group}>
                                <label>Hora Fim:</label>
                                <input type='text' name = "HoraFim" defaultValue={produtividade.HoraFim}/>
                            </div>
                            
                            <div className={styles.form_group}>
                                <label>Duracao:</label>
                                <span>{produtividade.Duracao}</span>
                            </div>  
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}

export default ProdutividadeModal;