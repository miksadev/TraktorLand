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
        <button onClick={() => {
        	var user = props.user
        	var item = props.item
        	var popust = 0;
        	if(user.id != undefined){
        		if(user.rabat == 1){
        			popust = item.rabat_1
        		}else if(user.rabat == 2){
        			popust = item.rabat_2
        		}else{
        			popust = item.rabat_3
        		}
        	}

        	var objToCart = {...props.item}
        	
        	objToCart["price2"] = item.price * (1 - popust/100)
        	addToCart(objToCart)
        }} className={classes.join(' ')}>+ Dodaj u Korpu</button>
    );
}
export default atcbutton;