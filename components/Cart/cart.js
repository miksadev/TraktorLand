import React from 'react';
import styles from './cart.module.css';
import useCart from '../../util/useCart';
import LinkButton from '../UI/Cart/Button/linkButton';
import CartItems from './CartItems/cartitems';

const cart = () => {
    const {isCartOpened, items, toggleCart} = useCart();
    const prazno = 
    <>
        <p className={styles.praznakorpa}>Vasa korpa je prazna</p>
        <LinkButton click={toggleCart} styles={styles.LinkButton} link="/webshop" >Nazad na kupovinu</LinkButton>
    </>;
    return(
        <div className={isCartOpened ?  styles.CartOpen : styles.CartClosed}>
            {items.length != null && items.length > 0 ? <CartItems namena="korpa"/> : prazno}
        </div>
    );
}

export default cart;