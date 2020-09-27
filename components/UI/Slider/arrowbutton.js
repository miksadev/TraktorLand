import React from 'React';
import styles from './arrowbutton.module.css';
import { consts } from "react-elastic-carousel";

const arrowbutton = (props) => {
    return(
        <button className={styles.button} onClick={props.onClick} disabled={props.disabled}>
            { props.tip === consts.PREV ? <img src="/slajder/left.png"/> : <img src="/slajder/right.png"/>}
        </button>
    );
}

export default arrowbutton;