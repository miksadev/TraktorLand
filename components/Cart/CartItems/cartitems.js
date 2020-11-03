import React from 'react';
import styles from './cartitems.module.css';
import CartItem from './CartItem/cartitem';
import useCart from '../../../util/useCart';
import LinkButton from '../../UI/Button/LinkButton/linkButton';

const cartitems = (props) => {

    const {price, toggleCart, items, removeFromCart, addOne, removeOne} = useCart();
    
    let cartitems = items.map(cartitem => {
        const item = {id: cartitem.id, ime: cartitem.name,slika: cartitem.src,price: Number(cartitem.price), qty: cartitem.qty, sifra: cartitem.sifra};
        return <CartItem edit={true} sifra={cartitem.sifra} namena={props.namena} key={cartitem.id} src={cartitem.slika} name={cartitem.ime} price={cartitem.price} qty={cartitem.qty} up={() => addOne(item)} down={() => removeOne(item)} brisi={() => removeFromCart(item)}></CartItem>
    });

    let korpa = (
        <div className={styles.cartitems}>
        <h3 className={styles.ime}>KORPA</h3>
        <img onClick={toggleCart} className={styles.X}src="/header/x.png" alt=""/>
        <div className={styles.gornjideo}>
            {cartitems}
        </div>
        <div className={styles.donjideo}>
            <p>UKUPNO: <span>{price}</span><span> RSD</span></p>
            <LinkButton click={toggleCart} link="/checkout" styles={styles.Button}>Završi kupovinu</LinkButton>
        </div>
    </div>);
    let checkout = <div className={styles.cartitemscheckout}>{cartitems}</div>;

    return (<>{props.namena == "korpa"? korpa : checkout}</>);
}

export default cartitems;