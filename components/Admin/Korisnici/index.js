import React from 'react';
import styles from './korisnici.module.css';
import Korisnik from './Korisnik/index';

const korisnici = (props) => {
    return(
        <div className={styles.korisnici}>
            <Korisnik ime="Mihajlo Stankovic" adresa="Nikole Pasica 16"datum="19/09/2000" rabat="15"/>
            <Korisnik ime="Mihajlo Stankovic" adresa="Nikole Pasica 16"datum="19/09/2000" rabat="15"/>
            <Korisnik ime="Mihajlo Stankovic" adresa="Nikole Pasica 16"datum="19/09/2000" rabat="15"/>
            <Korisnik ime="Mihajlo Stankovic" adresa="Nikole Pasica 16" datum="19/09/2000" rabat="15"/>
        </div>
        
    );
}

export default korisnici;