import React from 'react';
import styles from './korisnik.module.css';
import Link from 'next/link';

const korisnik = (props) => {
    return (
        <div className={styles.korisnik}>
            <div className={styles.datum}>
                Datum kreiranja: {props.datum}
            </div>
            <div className={styles.ime}>
                {props.ime}
            </div>
            <div className={styles.adresa}>
                {props.adresa}
            </div>
            <div className={styles.rabat}>
                <div className={styles.box}>
                    {props.rabat}
                </div>
                <h3 className={styles.proc}>
                    Rabat (%)
                </h3>
            </div>
            <Link href="/admin/korisnici/edit"><img className={styles.edit} src="/admin/edit.png" alt=""/></Link>
            <Link href="/admin/korisnici/delete"><img className={styles.delete} src="/admin/delete.png" alt=""/></Link>
        </div>
    );
}

export default korisnik;