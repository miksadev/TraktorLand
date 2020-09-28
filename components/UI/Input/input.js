import React from 'react';
import styles from './input.module.css';

const input = (props) => {
    let inputElement = null;
    switch(props.inputtype){
        case('input'):
            inputElement = <input className={styles.input} {...props}/>;
            break;
        case('textarea'):
            inputElement= <textarea className={styles.textarea}{...props}/>;
            break;
        default: 
            inputElement= <input className={styles.Input} {...props}/>;
    }
    return(
        <div className={styles.inputdiv}>
            <label className={styles.label}>{props.label}</label>
            {inputElement}
        </div>

    );
}

export default input;