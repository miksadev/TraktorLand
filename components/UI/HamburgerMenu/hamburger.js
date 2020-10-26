import React, { useState } from 'react';
import styles from './hamburger.module.css';

const hamburger = (props) => {
    const [open, setOpen] = useState(false);

    const onClickHandler = () => {
        setOpen(!open);
    }


    return(
        <div onClick={onClickHandler} id={styles.navicon3} className={open ? styles.open : null}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}

export default hamburger;