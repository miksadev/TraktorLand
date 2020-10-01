import React from 'react';
import styles from './logo.module.css';
import Link from 'next/link';
const logo = () => {
    return (
        <Link href="/">
            <div className={styles.logo}>
                <h3 className={styles.p}>TRAKTOR</h3>
                <h3 className={styles.p}>LAND.<span className={styles.span}>RS</span></h3> 
            </div>
        </Link>
        
    );
}

export default logo;