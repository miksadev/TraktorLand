import React from 'react';
import styles from './orderi.module.css';
import Order from './Order/order';

const orderi = ({orders}) => {
    return(
        <div className={styles.orderi}>
            {orders.map(item => <Order ime={item.ime_prezime}
            	prezime="" adresa={item.adresa+` `+item.grad+` `+item.postanski_broj} kolicina="" cena={item.price} orderid={`#`+item.id}/>)}
          
        </div>
    )
}

export default orderi;