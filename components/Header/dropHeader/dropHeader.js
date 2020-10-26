import React from 'react';
import styles from './dropHeader.module.css';
import Link from 'next/link';

<<<<<<< HEAD
const dropHeader = (props) => {
    return(
            <div className={styles.dropHeader}>
                <ul>
                    <Link href="/"><li onClick={props.setopen}>Pocetna</li></Link>
                    <Link href="/kontakt"><li onClick={props.setopen}>Kontakt</li></Link>
                    <Link href="/webshop"><li onClick={props.setopen}>Webshop</li></Link>
                </ul>
            </div>
=======
const dropHeader = () => {
    return(
        <div className={styles.drop}>
            <div className={styles.wrapper}>
                <div className={styles.dropHeader}>
                    <ul>
                        <li>Kontakt</li>
                        <li>WebShop</li>
                    </ul>
                </div>
            </div>
            
        </div>
>>>>>>> viktor
        
    );
}

export default dropHeader;