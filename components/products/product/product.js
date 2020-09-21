import React from 'react';
import styles from './product.module.css';
import ATCButton from '../../UI/Cart/Button/atcbutton.js';

const product = (props) => {
    return (
        <>
            <div className={styles.product}>
                <p className={styles.name}>{props.name}</p>
                <img classname={styles.img} src={props.src} alt=""/>
                <p className={styles.cena}>{props.price}<span> RSD</span></p>
                <ATCButton></ATCButton>
            </div>
        </>
    );
    }

export default product;