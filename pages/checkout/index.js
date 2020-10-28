import React, {useState} from 'react';
import styles from "../../styles/checkout.module.css";
import CartItems from '../../components/Cart/CartItems/cartitems'; 
import Total from '../../components/UI/Checkout/total';
import useCart from '../../util/useCart';
import LinkButton from '../../components/UI/Button/LinkButton/linkButton';
import FinishOrder from '../../components/UI/FinishOrder/PopUp/popUp';
import {useRouter} from 'next/router';
import Cookies from 'cookies'
export async function getServerSideProps({req,res}){

        var login = false;
        var user = ""
        var email = ""
        var cookies = new Cookies(req,res)
        var authToken = cookies.get('auth-token')
        if(authToken != undefined){
             login = true;
             await fetch('http://localhost:3000/api/checkauth',
            {headers:{'auth-token':authToken}}).then(res => res.json())
        .then(data => {
           email = data.email
        })

        await fetch('http://localhost:3000/api/getuser',{
                method:'POST',
                body:JSON.stringify({email:email})
            }).then(res => res.json()).then(data => {
                user = data.user
            })
        }
        
        
        return{
           props:{
            user:user,
            login:login
           }
        }
}
export default function Checkout({login,user}) {
  
  const { price, items } = useCart();
  const [showPopUp, setShowPopUp] = useState(false);
  const router = useRouter();
  const popUpHandler = () => {
    if(login){
      router.push('/checkout/orderdetails')
      return;
    }
    setShowPopUp(!showPopUp);
  }

  const praznakorpa = <div className={styles.praznaKorpa}>
    <h3>Vasa korpa je prazna</h3>
    <LinkButton link="/webshop">Nazad na kupovinu</LinkButton>
  </div>;
  const punakorpa = (
  <>
    <CartItems namena="checkout"/><div className={styles.total}>
    <Total edit={true} klik={() => popUpHandler()} price={price} rabat={user.rabat == undefined ?'0':user.rabat}/></div>
    <FinishOrder show={showPopUp} off={() => popUpHandler()}/>
    
  </>);
  return (
        <div className={styles.body}>
            <h1 className={styles.naslov}>Moja Korpa</h1>
            <div className={styles.line}></div>
            
            {items.length > 0 ? punakorpa : praznakorpa}
            
            
        </div>
  )
}
