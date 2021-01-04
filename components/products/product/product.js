import React, {useState} from 'react';
import styles from './product.module.css';
import ATCButton from '../../UI/Button/AddToCart/atcbutton.js';
import Link from 'next/link';
import useCart from '../../../util/useCart';
const product = (props) => {
    const [quantity, setQty] = useState(props.kolicina == 0 ? 0 : 1);
    const [initialItem ,setInitialItem] = useState({id:props.id, ime: props.name,slika: props.src, price: Number(props.price*1.2).toFixed(2), qty: 1, sifra: props.sifra,kolicina:props.kolicina,rabat_1:props.rabat_1,
        rabat_2:props.rabat_2,rabat_3:props.rabat_3});
    const {isItemOpened, toggleItem} = useCart();

    const onChangeHandler = (e) => {
        if(e.target.value > props.kolicina){
            setQty(props.kolicina);
            setInitialItem({...initialItem, qty:Number(props.kolicina)});
        }
        else{
            setQty(e.target.value);
            setInitialItem({...initialItem, qty:Number(e.target.value)});
        }
    }
    const HOST = process.env.NEXT_PUBLIC_HOST;
    const PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
       return (
        <>
            <div className={styles.product}>
                <div onClick={toggleItem} >
                {props.search == "true" ? <Link href={'/webshop/'+props.tip+'/'+props.id+'?s='+props.backroute}><a><p className={styles.name}>{props.name}</p>
                    <img className={styles.img} src={props.src ? props.src : "/product.png"} alt=""/></a></Link> : <Link href={'/webshop/'+props.tip+'/'+props.id}><a><p className={styles.name}>{props.name}</p>
                    <img className={styles.img} src={props.src ? props.src : "/product.png"} alt=""/></a></Link>}
                    
                </div>
                
                <p className={styles.cena}>{Number(props.price*1.2).toFixed(0)}<span> RSD</span></p>
                <input onChange={(event) => onChangeHandler(event)} className={styles.input} type="number" value={quantity} name="kolicina" placeholder="1" min={props.kolicina == 0 ? 0 : 1} max={props.kolicina}/>
                <ATCButton item={initialItem} user={props.user}></ATCButton>
            </div>
        </>
    );
    }

export default product;