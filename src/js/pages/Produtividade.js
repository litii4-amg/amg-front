import React, { useState, useEffect} from "react";

import styles from "../../css/Produtividade.module.css"

import {FaEye} from "react-icons/fa";


function Produtividade() {
    
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        async function fetchProdutos() {
            try {
                const response = await fetch("http://localhost:3001/produtividade/");
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
                        <th>Data</th>
                        <th>Produto</th>
                        <th>Op</th>
                        <th>Lote</th>
                        <th>Kg</th>
                        <th>Forno</th>
                        <th>Operador</th>
                        <th>HoraInicio</th>
                        <th>HoraFim</th>
                        <th>Duracao</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody className={styles.tbody}>
                    {produtos.length > 0 ? (
                        produtos.map((produto) => (
                            <tr key={produto.Produto}>
                                <td>{produto.Data}</td>
                                <td>{produto.Produto}</td>
                                <td>{produto.Op}</td>
                                <td>{produto.Lote}</td>
                                <td>{produto.Kg}</td>
                                <td>{produto.Forno}</td>
                                <td>{produto.Operador}</td>
                                <td>{produto.HoraInicio}</td>
                                <td>{produto.HoraFim}</td>
                                <td>{produto.Duracao}</td>
                                <td>
                                    <button className={styles.button}>
                                        <FaEye className={styles.icon}/>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="11">Carregando produtos...</td>
                        </tr>
                    )}
                </tbody>
            </table>      
        </div>
    );
}

export default Produtividade;