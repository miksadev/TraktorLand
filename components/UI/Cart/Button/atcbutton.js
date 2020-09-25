import React from 'react';
import styles from './atcbutton.module.css';
import useCart from '../../../../util/useCart';

const atcbutton = () => {
    const addToCart = useCart(addToCart);
    return (
        <button onClick={addToCart} className={styles.Button}>+ Dodaj u Korpu</button>
    );
}
export default atcbutton;