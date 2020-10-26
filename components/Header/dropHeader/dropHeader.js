import React from 'react';
import styles from './dropHeader.module.css';
import Link from 'next/link';

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
        
    );
}

export default dropHeader;