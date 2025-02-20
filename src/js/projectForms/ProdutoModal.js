import React, {useState, useEffect, use} from 'react';

import styles from './ProdutoModal.module.css';

function ProdutoModal({isOpen, onClose, produto}) {
    if (!isOpen || !produto) return null;
    
    return (
        <div className={styles.window}>
            <div className={styles.window_content}>
                <button className={styles.close_button} onClick={onClose}>&times;</button>
                <div className={styles.form_group}>
                    <label>Código:</label>
                    <span>{produto.cod}</span>
                </div>
                <div className={styles.form_group}>
                    <label>Descrição:</label>
                    <textarea name="descricao" defaultValue={produto.descricao} rows={3} />
                </div>
                <div className={styles.form_group}>
                    <label>Tipo:</label>
                    <input type="text" name="tipo" defaultValue={produto.tipo} />
                </div>
                <div className={styles.form_group}>
                    <label>Código da linha:</label>
                    <span>{produto.codLinha}</span>
                </div>
                <div className={styles.form_group}>
                    <label>Rastro:</label>
                    <input type="text" name="rastro" defaultValue={produto.rastro} />
                </div>
                <div className={styles.form_group}>
                    <label>Metal:</label>
                    <input type="text" name="metal" defaultValue={produto.metal} />
                </div>
                <div className={styles.form_group}>
                    <label>Refusão:</label>
                    <input type="text" name="refusao" defaultValue={produto.refusao} />
                </div>
                <div className={styles.form_group}>
                    <label>Componente:</label>
                    <input type="text" name="cod_componente" defaultValue={produto.cod_componente} />
                </div>
                <div className={styles.form_group}>
                    <label>Descrição do Componente:</label>
                    <input type="text" name="desc_componente" defaultValue={produto.desc_componente} />
                </div>
                <div className={styles.form_group}>
                    <label>Quantidade do Componente:</label>
                    <input type="text" name="qtd_componente" defaultValue={produto.qtd_componente} />
                </div>
                <div className={styles.form_group}>
                    <label>Nome:</label>
                    <input type="text" name="nome" defaultValue={produto.nome} />
                </div>
                <div className={styles.form_group}>
                    <label>Acabamento:</label>
                    <input type="text" name="acabamento" defaultValue={produto.acabamento} />
                </div>
            </div>
        </div>
       
    )
}

export default ProdutoModal;