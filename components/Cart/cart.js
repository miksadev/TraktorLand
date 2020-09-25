import React from 'react';
import styles from './cart.module.css';
import useCart from '../../util/useCart';
import LinkButton from '../UI/Cart/Button/linkButton';

const cart = () => {
    const {isCartOpened, items,toggleCart} = useCart();
    let cartitems;
    const prazno = 
    <>
        <p className={styles.praznakorpa}>Vasa korpa je prazna</p>
        <LinkButton click={toggleCart} styles={styles.LinkButton} link="/webshop" >KUPI!</LinkButton>
    </>;
    return(
        <div className={isCartOpened ?  styles.CartOpen : styles.CartClosed}>
            {items.length != null && items.length > 0 ? cartitems: prazno}
        </div>
    );
}

export default cart;