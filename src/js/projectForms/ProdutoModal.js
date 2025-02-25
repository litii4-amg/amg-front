import React, {useState, useEffect} from 'react';

import styles from './ProdutoModal.module.css';

function ProdutoModal({isOpen, onClose, produtoID}) {
    
    const [produtoList, setProdutoList] = useState([]);

    useEffect(() => {
        if (isOpen && produtoID) {
            fetchProduto(produtoID);
        }else{
            setProdutoList([{cod: 0, descricao: "", tipo: "", codLinha: 0, rastro: "", metal: "", refusao: "", cod_componente: 0, desc_componente: "", qtd_componente: 0, nome: "", acabamento: ""}]);
        }
    }, [isOpen, produtoID]);
    
    useEffect(() => {
        console.log("Produto List Atualizado:", produtoList);
    }, [produtoList]);
    
    const fetchProduto = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/produto/${id}`);
            const data = await response.json();
            
            setProdutoList([data]);
            

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

                <h2>Detalhes do Produto</h2>

                <div>
                    {produtoList.map((produto, index) => (
                        <div key={produto.Cod || index} className={styles.form_group}>
                            <label>Código:</label>
                            <span>{produto.Cod}</span>
                    
                            <div className={styles.form_group}>
                                <label>Descrição:</label>
                                <textarea name="descricao" defaultValue={produto.Descricao} rows={3} />
                            </div>
                            <div className={styles.form_group}>
                                <label>Tipo:</label>
                                <input type="text" name="tipo" defaultValue={produto.Tipo} />
                            </div>
                            <div className={styles.form_group}>
                                <label>Código da linha:</label>
                                <span>{produto.Cod_Linha}</span>
                            </div>
                            <div className={styles.form_group}>
                                <label>Rastro:</label>
                                <input type="text" name="rastro" defaultValue={produto.Rastro} />
                            </div>
                            <div className={styles.form_group}>
                                <label>Metal:</label>
                                <input type="text" name="metal" defaultValue={produto.Metal} />
                            </div>
                            <div className={styles.form_group}>
                                <label>Refusão:</label>
                                <input type="text" name="refusao" defaultValue={produto.Refusao} />
                            </div>
                            <div className={styles.form_group}>
                                <label>Componente:</label>
                                <input type="text" name="cod_componente" defaultValue={produto.Cod_Componente} />
                            </div>
                            <div className={styles.form_group}>
                                <label>Descrição do Componente:</label>
                                <input type="text" name="desc_componente" defaultValue={produto.Desc_Componente} />
                            </div>
                            <div className={styles.form_group}>
                                <label>Quantidade do Componente:</label>
                                <input type="text" name="qtd_componente" defaultValue={produto.Qtd_Componente} />
                            </div>
                            <div className={styles.form_group}>
                                <label>Nome:</label>
                                <input type="text" name="nome" defaultValue={produto.Nome} />
                            </div>
                            <div className={styles.form_group}>
                                <label>Acabamento:</label>
                                <input type="text" name="acabamento" defaultValue={produto.Acabamento} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProdutoModal;