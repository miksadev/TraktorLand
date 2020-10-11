import React from 'react';
import styles from './total.module.css';
import Submit from '../Button/Submit/submit';

const total = (props) => {
    return (
        <div className={styles.total}>
            <h2 className={styles.heading}>Totalni obracun</h2>
            <div>
                <h3 className={styles.proizvodii} >Proizvodi</h3>
                <h2 className={styles.price}>{props.price} RSD</h2>
            </div>
            
            <div>
                <h3 className={styles.rabatt}>Rabat</h3>
                <h2 className={styles.rabat}>{props.rabat}%</h2>
            </div>
            
            
            <div className={styles.line}></div>
            <h3 className={styles.ukupno}>UKUPNO</h3>
            <h3 className={styles.ukupnocena}>{props.price * (1 - props.rabat/100)} RSD</h3>
            <Submit submit={props.klik} styles={styles.button} >Zavrsi porudzbinu</Submit>
        </div>
    );
}

export default total;