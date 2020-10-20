import React from 'react';
import styles from './order.module.css';
import CartItem from '../Cart/CartItems/CartItem/cartitem';
import Total from '../UI/Checkout/total';
import Input from '../UI/Input/input';
import Submit from '../UI/Button/Submit/submit';

const order = (props) => {
    return(
        <>
            <div className={styles.row}>
                <div className={styles.CartItems}>
                    <CartItem edit={props.edit} sifra="#123456" namena={props.namena} src="/product.png" name="Sunce rotacioni sakupljac" price="650" qty="1" up={() => addOne(item)} down={() => removeOne(item)} brisi={() => removeFromCart(item)}></CartItem>
                    <CartItem edit={props.edit} sifra="#123456" namena={props.namena} src="/product.png" name="Sunce rotacioni sakupljac" price="650" qty="1" up={() => addOne(item)} down={() => removeOne(item)} brisi={() => removeFromCart(item)}></CartItem>
                    <CartItem edit={props.edit} sifra="#123456" namena={props.namena} src="/product.png" name="Sunce rotacioni sakupljac" price="650" qty="1" up={() => addOne(item)} down={() => removeOne(item)} brisi={() => removeFromCart(item)}></CartItem>
                    <CartItem edit={props.edit} sifra="#123456" namena={props.namena} src="/product.png" name="Sunce rotacioni sakupljac" price="650" qty="1" up={() => addOne(item)} down={() => removeOne(item)} brisi={() => removeFromCart(item)}></CartItem>
                    <CartItem edit={props.edit} sifra="#123456" namena={props.namena} src="/product.png" name="Sunce rotacioni sakupljac" price="650" qty="1" up={() => addOne(item)} down={() => removeOne(item)} brisi={() => removeFromCart(item)}></CartItem>
                    <CartItem edit={props.edit} sifra="#123456" namena={props.namena} src="/product.png" name="Sunce rotacioni sakupljac" price="650" qty="1" up={() => addOne(item)} down={() => removeOne(item)} brisi={() => removeFromCart(item)}></CartItem>
                </div>
                <div className={styles.total}>
                    <Total edit={props.edit} price="500" rabat="10"/>
                    <div className={styles.orderinfo}>
                    {/* <Input inputtype="input" label="Napomena"/> */}
                    <div className={styles.infoblock}>
                        <h3>Detalji narucioca</h3>
                        <ul>
                            <li>Petar Peric</li>
                            <li>Cara Dusana</li>
                            <li>11000 Beograd</li>
                            <li>Serbia</li>
                            <li>petarpetropvic@gmail.com</li>
                            <li>0691234567</li>
                        </ul>
                        <Submit styles={styles.dugme}>Zavrsi</Submit>
                    </div>
                </div>
                </div>
                
            </div>
            {/* <div className={styles.row}>
                <div className={styles.line}></div>
                
                
            </div> */}
        </>
    );
}

export default order;