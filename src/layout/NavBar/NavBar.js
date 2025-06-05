import {useState} from 'react';

import {Link} from "react-router-dom"

import styles from "./Navbar.module.css"

import logo from "../../assets/img/AMG-logo-blue.svg"

import { IoIosArrowDown } from "react-icons/io";

function Navbar(){
    const [dropdownOpen, setDropdownOpen] = useState(false);
    return(
        <nav className={styles.navbar}>
            <Link to="/"><img src={logo} alt="AMG"/></Link>
            <ul className={styles.list}>
                <li className={styles.dropdown} onMouseEnter={() => setDropdownOpen(true) } onMouseLeave={() => setDropdownOpen(false)}>
                    <span className={styles.dropbtn}>Produção <IoIosArrowDown className={styles.IoIosArrowDown}/></span>
                
                    {dropdownOpen && (
                        <ul className={styles.dropdown_content}>
                            <li><Link to ="/folhaProducao">Folha de Produção</Link></li>
                            <li><Link to ="/folhaProducaoAudio">Folha de Produção Audio</Link></li>
                            <li><Link to ="/folhaProducaoDados">Folha de Produção Dados</Link></li>
                            <li><Link to ="/folhaProduFront">Folha de Produção Front</Link></li>
                        </ul>
                    )}
                </li>
            </ul>
        </nav>

    );
}
export default Navbar;