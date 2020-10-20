import React from 'react';
import Order from '../../../components/Order/order';
import styles from '../../../styles/checkout.module.css';
const order = () => {
    return (
        <div className={styles.container}>

        <div className={styles.body}>
            <h1 className={styles.naslov}>Pregled porudzbine</h1>
            <div className={styles.line}></div>
            <Order namena="checkout" edit={false}/>
            
            
        </div>
       

    </div>
       
    );
}

export default order;