import React from 'react';
import styles from './cartitem.module.css';
import CartItemInfo from '../../../UI/Cart/CartItemInfo/cartItemInfo';

const cartitem = (props) => {
    return(
        <div className={props.namena == "korpa" ? styles.cartitem : styles.checkoutitem}>
            <img className={props.namena == "korpa" ? styles.img : styles.cimg} src={props.src} alt=""/>
            <p className={props.namena == "korpa" ? styles.name : styles.cname}>{props.name}</p>
            <p className={props.namena == "korpa" ? styles.price: styles.cprice}>{props.price} RSD</p>
            <CartItemInfo brisi={props.brisi} qty={props.qty} up={props.up} down={props.down}/>
        </div>
    );
}

export default cartitem;