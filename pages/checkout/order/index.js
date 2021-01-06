import React,{useState,useEffect,useLayoutEffect} from 'react';
import Order from '../../../components/Order/order';
import styles from '../../../styles/checkout.module.css';
import qs from 'querystring';
import useCart from '../../../util/useCart';
import Link from 'next/link';
const order = () => {
	 const {items,user,shipping } = useCart();
    return (
        <div className={styles.container}>

        <div className={styles.body}>
            <h1 className={styles.naslov}>Pregled porudzbine</h1>
            <div className={styles.line}></div>
            <Link href="/checkout"><h1 className={styles.izmeniPorudzbinu}>{"< Izmeni porudžbinu"}</h1></Link>
            <Order namena="checkout" orderaddress={shipping} data={items} edit={false}/>
            
            
        </div>
       

    </div>
       
    );
}
export default order;