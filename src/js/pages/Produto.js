import React, { useState, useEffect } from "react";

import {FaEye} from "react-icons/fa";

import styles from "../../css/Produto.module.css"

import ProdutoModal from "../projectForms/ProdutoModal";

function Produto() {

    const [produtos, setProdutos] = useState([]);
    const [isProdutoModalOpen, setIsProdutoModalOpen] = useState(false);

    useEffect(() => {
        async function fetchProdutos() {
            try {
                const response = await fetch("http://localhost:3000/produto/");
                const data = await response.json();
                console.log(data);
                setProdutos(data);
            } catch (error) {
                console.error("Erro ao carregar os produtos:", error);
            }
        }
        fetchProdutos();
    }, []);

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr>
                        <th>Código</th>
                        <th>Tipo</th>
                        <th>Código da linha</th>
                        <th>Nome</th>
                        <th>Acabamento</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {produtos.length > 0 ? (
                        produtos.map((produto) => (
                            <tr key={produto.Cod}>
                                <td>{produto.Cod}</td>
                                <td>{produto.Tipo}</td>
                                <td>{produto.Cod_Linha}</td>
                                <td>{produto.Nome}</td>
                                <td>{produto.Acabamento}</td>
                                <td>
                                    <button
                                        className={styles.button}
                                        onClick={() => setIsProdutoModalOpen(true)}
                                    >
                                        <FaEye className={styles.icon} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">Carregando produtos...</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ProdutoModal 
                isOpen={isProdutoModalOpen} 
                onClose={() => setIsProdutoModalOpen(false)}/>
        </div>
    );
}

export default Produto;