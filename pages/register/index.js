import React, {useState} from 'react';
import Input from '../../components/UI/Input/input';
import styles from '../../styles/login.module.css';
import Form from '../../components/Form/form';
import Submit from '../../components/UI/Button/Submit/submit';
import Link from 'next/link';

const register = () => {
    const [showForm, setShowForm] = useState(false);
    const [pravnaLica , setPravnaLica] = useState(false);

    const formTypeHandler = (type) => {
        if(type == "fizicko"){
            setShowForm(true);
            setPravnaLica(false);
        }
        else{
            setShowForm(true);
            setPravnaLica(true);
        }
    }

    return (
        <div className={styles.body}>
            <div className={styles.login}>
                <Form formname="Registruj se">
                    
                    <img onClick={() => formTypeHandler("fizicko")} className={styles.choosebutton} src={showForm && !pravnaLica ? "/register/fl1.png" : "/register/fl.png"} alt=""/>
                    <img onClick={() => formTypeHandler("pravno")} className={styles.choosebutton} src={showForm && pravnaLica ? "/register/pl1.png" : "/register/pl.png" } alt=""/>
                {showForm ? 
                    <>
                        <Input inputtype="input" requiered label="Ime" placeholder="npr. Petar" name="ime" type="text"></Input>
                        <Input inputtype="input" requiered label="Prezime" placeholder="npr. Petrovic" name="prezime" type="text"></Input>
                        {pravnaLica ? <><Input inputtype="input" requiered label="Naziv firme" placeholder="npr. Petrovic DOO" name="imefirme" type="text"></Input>
                        <Input inputtype="input" requiered label="PIB" placeholder="npr. 123456" name="pib" type="text"></Input></> : null}
                        
                        <Input inputtype="input" requiered label="Telefon" placeholder="npr. 060/123/45-67" name="ime" type="text"></Input>
                        <Input inputtype="input" requiered label="E-mail" placeholder="npr. vasaadresa@gmail.com" name="email" type="e-mail"></Input>
                        <div className={styles.line}></div>
                        <Input inputtype="input" requiered label="Adresa" placeholder="npr. Cara Dusana 26" name="adresa" type="text"></Input>
                        <Input inputtype="input" requiered label="Grad" placeholder="npr. Beograd" name="grad" type="text"></Input>
                        <Input inputtype="input" requiered label="Postanski br." placeholder="npr. 11000" name="postanskibroj" type="text"></Input>
                        <div className={styles.line}></div>
                        <Input inputtype="input" requiered label="Lozinka"  placeholder="•••••••••••••" name="lozinka" type="password"></Input>
                        <Input inputtype="input" requiered label="Potvrdite lozinku"  placeholder="•••••••••••••" name="potvrditelozinku" type="password"></Input>
                        <div className={styles.block}><Submit styles={styles.loginbutton}>Registruj se</Submit></div>
                        </> : null}
                    </Form>
            </div>
        </div>
    );
}

export default register;