import { useState, useEffect } from "react";

import {FaEye} from "react-icons/fa";

import styles from "../../css/Produto.module.css"

function Produto() {

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
                    <tr>
                        <td>1</td>
                        <td>Produto 1</td>
                        <td>1</td>
                        <td>Nome 1</td>
                        <td>Acabamento 1</td>
                        <td>
                            <button className={styles.button}>
                                <FaEye className={styles.icon}/>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Produto 2</td>
                        <td>2</td>
                        <td>Nome 2</td>
                        <td>Acabamento 2</td>
                        <td>
                            <button className={styles.button}>
                                <FaEye className={styles.icon}/>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Produto 3</td>
                        <td>3</td>
                        <td>Nome 3</td>
                        <td>Acabamento 3</td>
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

export default Produto;