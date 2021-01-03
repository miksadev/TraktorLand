import React from 'react';
import styles from './cartitems.module.css';
import CartItem from './CartItem/cartitem';
import useCart from '../../../util/useCart';
import LinkButton from '../../UI/Button/LinkButton/linkButton';

const cartitems = (props) => {

    const {price, toggleCart, items, removeFromCart, addOne, removeOne, isLogged} = useCart();
    
    let cartitems = items.map(cartitem => {

        const item = {
          id: cartitem.id, 
          ime: cartitem.name,
          slika: cartitem.src,
          price: Number(cartitem.price).toFixed(2),
          price1: Number(cartitem.price1).toFixed(2), 
          price2: Number(cartitem.price2).toFixed(2),
          price3: Number(cartitem.price3).toFixed(2),
          qty: cartitem.qty, 
          sifra: cartitem.sifra
        };
        return <CartItem isLogged={isLogged} edit={true} sifra={cartitem.sifra} namena={props.namena} key={cartitem.id} src={cartitem.slika} name={cartitem.ime} price2={cartitem.price2} price={cartitem.price} qty={cartitem.qty} up={() => {
          if(cartitem.qty >= cartitem.kolicina){
            return;
          }else{
            addOne(item);
          }

        }} down={() => removeOne(item)} brisi={() => removeFromCart(item)}></CartItem>
    });

    let korpa = (
        <div className={styles.cartitems}>
        <h3 className={styles.ime}>KORPA</h3>
        <img onClick={toggleCart} className={styles.X}src="/header/x.png" alt=""/>
        <div className={styles.gornjideo}>
            {cartitems}
        </div>
        <div className={styles.donjideo}>
            <p>UKUPNO: <span>{Number(price).toFixed(0)}</span><span> RSD</span></p>
            <LinkButton click={toggleCart} link="/checkout" styles={styles.Button}>Završi kupovinu</LinkButton>
        </div>
    </div>);
    let checkout = <div className={styles.cartitemscheckout}>{cartitems}</div>;

    return (<>{props.namena == "korpa"? korpa : checkout}</>);
}

export default cartitems;