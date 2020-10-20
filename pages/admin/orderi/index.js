import React from 'react';
import styles from './proizvodi.module.css';
import Orderi from '../../../components/Admin/Orderi/orderi';

const proizvodi = () => {
    return (
        <div className={styles.proizvodi}>
            <div className={styles.heading}>
                <h3>Orderi</h3>
                <button className={styles.novi}>Novi</button>
                <button className={styles.zavrseni}>Zavrseni</button>
            </div>
            <Orderi/>
        </div>
    );
}

export default proizvodi;