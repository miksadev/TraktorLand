import styles from "../styles/Checkout.module.css";
import CartItems from '../components/Cart/CartItems/cartitems'; 
import Total from '../components/UI/Checkout/total';
import useCart from '../util/useCart';

export default function Checkout() {

  const { price } = useCart();
  return (
    <div className={styles.container}>

        <div className={styles.body}>
            <h1 className={styles.naslov}>CHECKOUT</h1>
            <div className={styles.line}></div>
            <CartItems namena="checkout"/>
            <div className={styles.total}>
            <Total price={price} rabat="0"/>
            </div>
            
        </div>
       

    </div>
  )
}
