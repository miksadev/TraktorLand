import React from 'react';
import styles from './proizvodi.module.css';
import Korisnici from '../../../components/Admin/Korisnici/index';
const proizvodi = () => {
    return (
        <div className={styles.proizvodi}>
            <div className={styles.heading}>
                <h3>Korisnici</h3>
            </div>
            <Korisnici/>
        </div>
    );
}

export default proizvodi;