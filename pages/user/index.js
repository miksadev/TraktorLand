import styles from '../../styles/user.module.css';
import React from 'react';
import LinkButton from '../../components/UI/Button/LinkButton/linkButton';

export default function User() {
  return (
    <div className={styles.container}>

        <div className={styles.body}>
          
        <div className={styles.form}>
            <h2 className={styles.naslov}>MOJ PROFIL</h2>
            <p className="podaci">Petar Peric</p>
            <p className="podaci">Cara Dusana 123</p>
            <p className="podaci">11000 Beograd</p>
            <p className="podaci">Serbia</p>
            <p className="podaci">petarpetrovic@gmail.com</p>
            <p className="podaci">060/123/45-67</p>
            <div className={styles.blok}>
                <LinkButton link="/logout" styles={styles.logout}>Odjavi se</LinkButton>
                <LinkButton link="/user/edit" styles={styles.edit}>Uredi profil</LinkButton>
            </div>
        </div>
        
        </div>

    </div>
  )
}
