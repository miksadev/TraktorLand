import React from 'react';
import styles from './akcija.module.css';
import Link from 'next/link';

const akcija = (props) => {
    return (
        <div className={styles.akcija}>
            <img className={styles.slika} src={props.img} alt=""/>
            <h2>{props.ime}</h2>
            <h3>Sifra: #{props.sifra}</h3>
            <Link href="/admin/akcija/edit"><img className={styles.edit} src="/admin/edit.png" alt=""/></Link>
            <Link href="/admin/akcija/delete"><img className={styles.delete} src="/admin/delete.png" alt=""/></Link>
        </div>
    );
}

export default akcija;