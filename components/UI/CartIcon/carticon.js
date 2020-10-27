import React from 'react';
import useCart from '../../../util/useCart';
import styles from './carticon.module.css';

const carticon = (props) => {
    const {toggleCart,items} = useCart();

    return(
        <div className={styles.carticon}>
            <p className={items.length != null && items.length > 0 ? styles.prikazi : styles.nema}>{items.length}</p>
            <img onClick={props.open ? null : toggleCart} src="/header/cart.png" alt=""/>
        </div>
        
    );
}

export default carticon;