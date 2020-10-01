import React from 'react';
import Input from '../../../components/UI/Input/input';
import styles from '../../../styles/login.module.css';
import Form from '../../../components/Form/form';
import Submit from '../../../components/UI/Button/Submit/submit';
import Link from 'next/link';

const login = () => {
    return (
        <div className={styles.body}>
            <div className={styles.login}>
                <Form formname="Zaboravljena lozinka">
                    <Input inputtype="input" label="E-mail" img="/login/email.png" placeholder="mojaadresa@gmail.com"name="email" type="text"></Input>
                    <div className={styles.block}><Submit styles={styles.loginbutton} >Posalji</Submit></div>
                    <div className={styles.block}>
                        <Link href="/login/"><p className={styles.forgotpw}>Nazad na prijavu</p></Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default login;