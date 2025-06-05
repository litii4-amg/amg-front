import React from "react";
import styles from "../../css/Footer.module.css"

function Footer(){
    return(
        <footer className={styles.footer}>
            <p className={styles.copy_right}><span>AMG</span> &copy;</p>
        </footer>
    );
}

export default Footer