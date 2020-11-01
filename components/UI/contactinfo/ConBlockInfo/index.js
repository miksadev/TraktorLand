import React from 'react';
import styles from './style.module.css';

const conBlockInfo = () => {
    return (
        <div className={styles.div}>
            <div className={styles.block}>
                <div className={styles.naslov}>
                    Radno Vreme
                </div>
                <div className={styles.text}>
                    08:00 - 16:00
                </div>
            </div>
            <div className={styles.block}>
                <div className={styles.naslov}>
                    Email
                </div>
                <div className={styles.text}>
                    info@traktorland.rs
                </div>
            </div>
            <div className={styles.block}>
                <div className={styles.naslov}>
                    Adresa
                </div>
                <div className={styles.text}>
                Knez Mihajlova 67,<br></br>18255 Pukovac
                </div>
            </div>
            <div className={styles.block}>
                <div className={styles.naslov}>
                    Telefon
                </div>
                <div className={styles.text}>
                    +381(18) 812 100
                </div>
            </div>
        </div>
    );
}

export default conBlockInfo;