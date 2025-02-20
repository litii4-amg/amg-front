import React, {useState, useEffect, use} from 'react';

import styles from './ProdutoModal.module.css';

function ProdutoModal({isOpen, onClose}) {
    if (!isOpen) return null;
    
    return (
        <div className={styles.window}>
            <div className={styles.window_content}>
                <button className={styles.close_button} onClick={onClose}>&times;</button>
                <form> 
                    <label>Código</label>
                    <input type="text" name="cod" />
                    <label>Tipo</label>
                    <input type="text" name="tipo" />
                    <label>Código da linha</label>
                    <input type="text" name="codLinha" />
                    <label>Nome</label>
                    <input type="text" name="nome" />
                    <label>Acabamento</label>
                    <input type="text" name="acabamento" />
                    <label>Composição</label>
                </form>
            </div>
        </div>
       
    )
}

export default ProdutoModal;