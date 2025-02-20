import React, { useState, useEffect} from "react";

import styles from "../../css/Produtividade.module.css"

import {FaEye} from "react-icons/fa";


function Produtividade() {
    
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
                    <tr>
                        <td>02/11/2024</td>
                        <td>BAl 8% WP</td>
                        <td>24211101001</td>
                        <td>2400022976</td>
                        <td>822</td>
                        <td>3</td>
                        <td>Roberto</td>
                        <td>00:37:00</td>
                        <td>23:58:00</td>
                        <td>11:21:00</td>
                        <td>
                            <button className={styles.button}>
                                <FaEye className={styles.icon}/>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>      
        </div>
    );
}

export default Produtividade;