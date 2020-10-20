import React from 'react';
import styles from '../proizvodi/proizvodi.module.css';
import Akcija from '../../../components/Admin/Akcije/akcije';
const proizvodi = () => {
    return (
        <div className={styles.proizvodi}>
            <div className={styles.heading}>
                <h3>Proizvodi na akciji</h3>
            </div>
            <Akcija/>
        </div>
    );
}

export default proizvodi;