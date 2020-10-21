 import React from 'react';
import styles from './popUp.module.css';
import LinkButton from '../../Button/LinkButton/linkButton';

const popup = (props) => {
    return(
        <>
        <div onClick={props.off} className={props.show ? styles.wrapper : styles.nema}>
            
        </div>
        {props.show ? 
        <div className={styles.popup}>
            <h3>Kako zelite zavrsiti?</h3>
            <LinkButton styles={styles.prvi} link="/register">Registrujte se</LinkButton>
            <div className={styles.divv}>
                <LinkButton styles={styles.drugi} link="/login">Postojeci nalog</LinkButton>
                <LinkButton styles={styles.treci} link="/checkout/orderdetails">Bez registracije</LinkButton>
            </div>
        </div> : null}
        
        </>
    );
}

export default popup;