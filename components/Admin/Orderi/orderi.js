import React from 'react';
import styles from './orderi.module.css';
import Order from './Order/order';

const orderi = () => {
    return(
        <div className={styles.orderi}>
            <Order ime="Mihajlo" prezime="Stankovic" adresa="Radanska 26 Nis 18000" kolicina="8" cena="15000" orderid="#123456"/>
            <Order ime="Mihajlo" prezime="Stankovic" adresa="Radanska 26 Nis 18000" kolicina="8" cena="15000" orderid="#123456"/>
            <Order ime="Mihajlo" prezime="Stankovic" adresa="Radanska 26 Nis 18000" kolicina="8" cena="15000" orderid="#123456"/>
            <Order ime="Mihajlo" prezime="Stankovic" adresa="Radanska 26 Nis 18000" kolicina="8" cena="15000" orderid="#123456"/>
        </div>
    )
}

export default orderi;