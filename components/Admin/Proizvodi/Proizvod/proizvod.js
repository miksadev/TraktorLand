import React from 'react';
import styles from './proizvod.module.css';
import Link from 'next/link';

const proizvod = (props) => {
    return (
        <div className={styles.proizvod}>
            <p className={styles.sifra}>Sifra: <span>{props.sifra}</span></p>
            <img className={styles.img} src={props.src} alt=""/>
            <p className={styles.name}>{props.name}</p>
            <p className={styles.price}>{props.price} RSD</p>   
            <p className={styles.kolicina}>{props.kolicina}</p>
            <Link href="/admin/proizvodi/add"><img className={styles.edit} src="/admin/edit.png" alt=""/></Link>
            
              
        </div>
    );
}

export default proizvod;