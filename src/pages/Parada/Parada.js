import React, { useState } from 'react';

import styles from "../../css/Parada.module.css"

import {FaEye} from "react-icons/fa";

// import ParadaModal from "../projectForms/ParadaModal";

function Parada() {
    
    const [isParadaModalOpen, setIsParadaModalOpen] = useState(false);
    
    return (
       <div className={styles.container}>
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr>
                        <th>Código Equipamento</th>
                        <th>Código Linha</th>
                        <th>Tempo Inicial</th>
                        <th>Tempo Final</th>
                        <th>Duração Total</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody className={styles.tbody}>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>00:00:00</td>
                        <td>00:00:00</td>
                        <td>00:00:00</td>
                        <td>
                            <button
                                className={styles.button}
                                onClick={() => setIsParadaModalOpen(true)}
                            >
                                <FaEye className={styles.icon}/>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button>Adicionar</button>
        </div>
    );
}

export default Parada;