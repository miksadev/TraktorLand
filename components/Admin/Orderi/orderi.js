import React from 'react';
import styles from './orderi.module.css';
import Order from './Order/order';

const orderi = ({orders}) => {
    return(
        <div className={styles.orderi}>
            {orders.slice(0).reverse().map(item => <Order key={item.id} ime={item.ime_prezime}
            	prezime="" created={item.created} vreme={item.time} adresa={item.adresa} grad={item.grad}pak={item.postanski_broj} id={item.id} cena={item.price} orderid={`#`+item.id}/>)}
          
        </div>
    )
}

export default orderi;