import {Link} from "react-router-dom"

import Container from './Container';

import styles from "../../css/Navbar.module.css"

import logo from "../../img/AMG-logo-blue.svg"

function Navbar(){
    return(
        <nav className={styles.navbar}>
            <Container>
                <Link to="/"><img src={logo} alt="AMG"/></Link>
                <ul className={styles.list}>
                    <li className={styles.item}><Link to="/">Inicio</Link></li>
                    <li className={styles.item}><Link to="/pedido">Pedido</Link></li>
                    <li className={styles.item}><Link to="/lote">Lote</Link></li>
                </ul>
            </Container>
        </nav>

    );
}
export default Navbar;