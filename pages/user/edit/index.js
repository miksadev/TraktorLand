import React, {useState} from 'react';
import Input from '../../../components/UI/Input/input';
import styles from '../../../styles/login.module.css';
import Form from '../../../components/Form/form';
import Submit from '../../../components/UI/Button/Submit/submit';
import Link from 'next/link';

const edit = () => {
    return (
        <div className={styles.body}>
            <div className={styles.login}>
                <Form formname="Izmeni profil">
                        <Input inputtype="input" requiered label="Ime" placeholder="npr. Petar" name="ime" type="text"></Input>
                        <Input inputtype="input" requiered label="Prezime" placeholder="npr. Petrovic" name="prezime" type="text"></Input>
                        <Input inputtype="input" requiered label="Naziv firme" placeholder="npr. Petrovic DOO" name="imefirme" type="text"></Input>
                        <Input inputtype="input" requiered label="PIB" placeholder="npr. 123456" name="pib" type="text"></Input>
                        
                        <Input inputtype="input" requiered label="Telefon" placeholder="npr. 060/123/45-67" name="ime" type="text"></Input>
                        <Input inputtype="input" requiered label="E-mail" placeholder="npr. vasaadresa@gmail.com" name="email" type="e-mail"></Input>
                        <div className={styles.line}></div>
                        <Input inputtype="input" requiered label="Adresa" placeholder="npr. Cara Dusana 26" name="adresa" type="text"></Input>
                        <Input inputtype="input" requiered label="Grad" placeholder="npr. Beograd" name="grad" type="text"></Input>
                        <Input inputtype="input" requiered label="Postanski br." placeholder="npr. 11000" name="postanskibroj" type="text"></Input>
                        <div className={styles.line}></div>
                        <Input inputtype="input" requiered label="Lozinka"  placeholder="•••••••••••••" name="lozinka" type="password"></Input>
                        <Input inputtype="input" requiered label="Potvrdite lozinku"  placeholder="•••••••••••••" name="potvrditelozinku" type="password"></Input>
                        <div className={styles.block}>
                            <Link href="/user"><p className={styles.forgotpw, styles.levo}>Otkazi</p></Link>
                            <div className={styles.desno}><Submit styles={styles.loginbutton}>Sacuvaj</Submit></div>
                        </div>
                        
                    </Form>
            </div>
        </div>
    );
}

export default edit;