import React from 'react';
import styles from './orderi.module.css';
import Order from './Order/order';

const orderi = ({orders}) => {
    return(
        <div className={styles.orderi}>
            {orders.map(item => <Order key={item.id} ime={item.ime_prezime}
            	prezime="" created={item.created} adresa={item.adresa+` `+item.grad+` `+item.postanski_broj} kolicina="" id={item.id} cena={item.price} orderid={`#`+item.id}/>)}
          
        </div>
    )
}

export default orderi;