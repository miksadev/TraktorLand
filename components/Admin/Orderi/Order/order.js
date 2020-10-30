import React from 'react';
import styles from './order.module.css';
import Link from 'next/link';
const order = (props) => {
    return(
        <div className={styles.order}>
            <div className={styles.id}>ORDER ID: {props.orderid} </div>
            <div className={styles.ime}>
                <h2>{props.ime + " " + props.prezime}</h2>
                <h3>{props.adresa}</h3>
                <h3>{props.grad +" "+ props.pak}</h3>
            </div>
            <div className={styles.kolicina}>
                <h3>{props.created}</h3>
                <h3>{props.vreme}</h3>
            </div>
            <div className={styles.cena}>
                <h3> {"Cena: "+props.cena}</h3>
            </div>
            <Link href={`/admin/orderi/`+props.id}>
                <div className={styles.dugme}>
                    <button>{">"}</button>
                </div>
            </Link>
            
        </div>
    );
}

export default order;