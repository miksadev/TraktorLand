import React from 'react';
import Input from '../../components/UI/Input/input';
import styles from '../../styles/login.module.css';
import Form from '../../components/Form/form';
import Submit from '../../components/UI/Button/Submit/submit';
import Link from 'next/link';

const login = () => {
    return (
        <div className={styles.body}>
            <div className={styles.login}>
                <Form formname="Prijavi se">
                    <Input inputtype="input" label="E-mail" img="/login/email.png" placeholder="mojaadresa@gmail.com"name="email" type="text"></Input>
                    <Input inputtype="input" label="Lozinka" img="/login/password.png" placeholder="•••••••••••••" name="password" type="password"></Input>
                    <div className={styles.block}><Submit styles={styles.loginbutton} >Prijava</Submit></div>
                    <div className={styles.block}>
                        <Link href="/login/forgotpassword"><p className={styles.forgotpw}>Zaboravili ste lozinku?</p></Link>
                        <p className={styles.registerprvi}>Nemate nalog? <Link href="/register"><span className={styles.register}> Registrujte se</span></Link></p>
                    </div>
                </Form>
                    
                
            </div>
        </div>
    );
}

export default login;