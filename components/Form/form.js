import React from 'react';
import styles from './form.module.css';

const form = (props) => {
    return (
        <form action={props.action} className={styles.form}>
            <h2>{props.formname}</h2>
            {props.children}
        </form>
    );
}

export default form;
