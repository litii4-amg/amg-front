import React, {useState, useEffect, use} from 'react';

import {Link} from "react-router-dom"

import Container from './Container';

import styles from "../../css/Navbar.module.css"

import logo from "../../img/AMG-logo-blue.svg"

import { IoIosArrowDown } from "react-icons/io";

function Navbar(){
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    return(
        <nav className={styles.navbar}>
            <Container>
                <Link to="/"><img src={logo} alt="AMG"/></Link>
                <ul className={styles.list}>
                    <li className={styles.item}><Link to="/">Inicio</Link></li>
                    
                    <li className={styles.dropdown} onMouseEnter={() => setDropdownOpen(true) } onMouseLeave={() => setDropdownOpen(false)}>
                    <span className={styles.dropbtn}>Produção <IoIosArrowDown className={styles.IoIosArrowDown}/></span>
                    
                    {dropdownOpen && (
                        <ul className={styles.dropdown_content}>
                            <li><Link to="/pedido">Pedido</Link></li>
                            <li><Link to="/lote">Lote</Link></li>
                            <li><Link to ="/produto">Produto</Link></li>
                        </ul>
                    )}
                    </li>
                    {/* <li className={styles.item}><Link to="/pedido">Pedido</Link></li>
                    <li className={styles.item}><Link to="/lote">Lote</Link></li>
                    <li className={styles.item}><Link to ="/produto">Produto</Link></li> */}
                </ul>
            </Container>
        </nav>

    );
}
export default Navbar;