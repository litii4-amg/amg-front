import React, { useState, useEffect } from "react";

import styles from "../../css/FolhaProducao.module.css"

function FolhaProducao() {
    return (
        <div className={styles.container}>
            <h1>Folha de Controle de Processo</h1>
            <div className={styles.section}>

                <div>
                    <p><strong>Corrida:</strong> 2500001895</p>
                    <p><strong>Data de Produção:</strong> 28/02/25</p>
                    <p><strong>Produto:</strong> 00007287-CAAL 6% BARRA</p>
                    <p><strong>Ordem de Produção:</strong> 24904401001</p>
                    <p><strong>Cliente:</strong> Não especificado</p>
                    <p><strong>Operador Leito:</strong> Leandro</p>
                    <p><strong>Operador Forno:</strong> Matheus Reis</p>
                    <p><strong>Líder:</strong> E. Simões</p>
                </div>

                <div className={styles.section_1}>
                    <table>
                        <thead>
                            <tr>
                                <th rowspan="2">Leito</th>
                                <th colspan="1">Fusão</th>
                                <th colspan="5">Reação</th>
                            </tr>
                            <tr>
                                <th>00011094 - Al P1535</th>
                                <th>00005012 - Ca Metálico</th>
                                <th>00011094 - Al P1535</th>
                                <th>00007287 - Refusão de CaAl 6%</th>
                                <th>00010786 - Al Reprocessado</th>
                                <th>00011217 - Fluxo Anteligas</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Peso (kg)</strong></td>
                                <td>700 ✔</td>
                                <td>60 ✔</td>
                                <td>84</td>
                                <td>366 ✔</td>
                                <td>40 ❌</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td><strong>Nº Lote</strong></td>
                                <td>700</td>
                                <td>21000</td>
                                <td>14499</td>
                                <td>2400002653 - Barra de 3 m</td>
                                <td>250001632</td>
                                <td>OK</td>
                            </tr>
                            <tr>
                                <td><strong>Peso Real (kg)</strong></td>
                                <td>OK</td>
                                <td>60 ✔</td>
                                <td></td>
                                <td></td>
                                <td>Já está seco e na área</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><strong>Temperatura Al</strong></td>
                                <td colspan="6">Atenção ao código para empenhar no sistema.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div className={styles.section_2}>
                    <table>
                        <thead>
                            <tr>
                                <th>Reação</th>
                                <th colspan="3" >Forno: 06</th>
                            </tr>
                            <tr>
                                <th>Etapa</th>
                                <th>Hora</th>
                                <th>Temperatura (°C)</th>
                                <th>Potência (KW)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Início Adição Ca</td>
                                <td>14:50</td>
                                <td>660</td>
                                <td>230</td>
                            </tr>
                            <tr>
                                <td>Fim Adição Ca</td>
                                <td>15:30</td>
                                <td>679</td>
                                <td>230</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                {/* <div className={styles.section}>
                    <h2>Produção</h2>
                    <p><strong>Barra:</strong> 12544 kg</p>
                    <p><strong>WP:</strong> 1</p>
                    <p><strong>Refusão:</strong> Não especificado</p>
                </div> */}
            </div>
        </div>
        
    );
}

export default FolhaProducao;