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
                Maršala Tita 133,<br></br>11272 Beograd
                </div>
            </div>
            <div className={styles.block}>
                <div className={styles.naslov}>
                    Telefon
                </div>
                <div className={styles.text}>
                    +381(011) 435 123
                </div>
            </div>
        </div>
    );
}

export default conBlockInfo;