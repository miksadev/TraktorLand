import styles from "../styles/checkout.module.css";
import CartItems from '../components/Cart/CartItems/cartitems'; 
import Total from '../components/UI/Checkout/total';
import useCart from '../util/useCart';
import LinkButton from '../components/UI/Button/linkButton';

export default function Checkout() {

  const { price, items } = useCart();
  const praznakorpa = <div className={styles.praznaKorpa}>
    <h3>Vasa korpa je prazna</h3>
    <LinkButton link="/webshop">Nazad na kupovinu</LinkButton>
  </div>;
  const punakorpa = (<><CartItems namena="checkout"/><div className={styles.total}><Total price={price} rabat="10"/></div></>);
  return (
    <div className={styles.container}>

        <div className={styles.body}>
            <h1 className={styles.naslov}>Moja Korpa</h1>
            <div className={styles.line}></div>
            {items.length > 0 ? punakorpa : praznakorpa}
            
            
        </div>
       

    </div>
  )
}
