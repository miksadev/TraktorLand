import React ,{useEffect} from 'react';
import styles from './atcbutton.module.css';
import useCart from '../../../../util/useCart';

const atcbutton = (props) => {
    const { addToCart } = useCart();
    let classes = [styles.Button]
    if(props.styles){
        classes.push(props.styles);
    }
    return (
        <button onClick={() => addToCart({...props.item})} className={classes.join(' ')}>+ Dodaj u Korpu</button>
    );
}
export default atcbutton;