import React from 'react';
import styles from './proizvodi.module.css';
import Proizvodi from '../../../components/Admin/Proizvodi/proizvodi';
import Link from 'next/link';

const proizvodi = () => {
    return (
        <div className={styles.proizvodi}>
            <div className={styles.heading}>
                <h3>Proizvodi</h3>
            </div>
            <Proizvodi/>
            <Link href="/admin/proizvodi/add"><img className={styles.add} src="/admin/add.png" alt=""/></Link>
        </div>
    );
}

export default proizvodi;