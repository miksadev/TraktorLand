import React from 'react';
import styles from './order.module.css';
import Link from 'next/link';
const order = (props) => {
    return(
        <div className={styles.order}>
            <div className={styles.id}>ORDER ID: {props.orderid}</div>
            <div className={styles.ime}>
                <h2>{props.ime + " " + props.prezime}</h2>
                <h3>{props.adresa}</h3>
            </div>
            <div className={styles.kolicina}>
                <h2>Kolicina: </h2>
                <h3> {props.kolicina}</h3>
            </div>
            <div className={styles.cena}>
                <h2>Cena: </h2>
                <h3> {props.cena}</h3>
            </div>
            <Link href="/admin/orderi/{id}">
                <div className={styles.dugme}>
                    <button>{">"}</button>
                </div>
            </Link>
            
        </div>
    );
}

export default order;