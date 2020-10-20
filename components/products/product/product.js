import React, {useState} from 'react';
import styles from './product.module.css';
import ATCButton from '../../UI/Button/AddToCart/atcbutton.js';
import Link from 'next/link';
import useCart from '../../../util/useCart';
const product = (props) => {
    const [quantity, setQty] = useState(1);
    const [initialItem ,setInitialItem] = useState({id:props.id, ime: props.name,slika: props.src, price: Number(props.price), qty: 1, sifra: props.sifra});
    const {isItemOpened, toggleItem} = useCart();

    const onChangeHandler = (e) => {
        setInitialItem({...initialItem, qty:Number(e.target.value)});
        setQty(e.target.value);
    }
    return (
        <>
            <div className={styles.product}>
                <div onClick={toggleItem} >
                    <Link href={props.backroute+'/'+props.id}><a><p className={styles.name}>{props.name}</p>
                    <img className={styles.img} src={props.src} alt=""/></a></Link>
                </div>
                
                <p className={styles.cena}>{props.price}<span> RSD</span></p>
                <input onChange={(event) => onChangeHandler(event)} className={styles.input} type="number" value={quantity} name="kolicina" placeholder="1" min="1"/>
                <ATCButton item={initialItem}></ATCButton>
            </div>
        </>
    );
    }

export default product;