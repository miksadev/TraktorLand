import React, {useState,useEffect} from 'react';
import styles from "../../styles/checkout.module.css";
// import CartItems from '../../components/Cart/CartItems/cartitems'; 
// import Total from '../../components/UI/Checkout/total';
import useCart from '../../util/useCart';
import LinkButton from '../../components/UI/Button/LinkButton/linkButton';
import FinishOrder from '../../components/UI/FinishOrder/PopUp/popUp';
import {useRouter} from 'next/router';
import Cookies from 'cookies'
import dynamic from 'next/dynamic';

export async function getServerSideProps({req,res}){
        var HOST = process.env.HOST;
        var PROTOCOL = process.env.PROTOCOL
        var login = false;
        var user = ""
        var email = ""
        var cookies = new Cookies(req,res)
        var authToken = cookies.get('auth-token')
        if(authToken != undefined){
             login = true;
             await fetch(PROTOCOL+'://'+HOST+'/api/checkauth',
            {headers:{'auth-token':authToken}}).then(res => res.json())
        .then(data => {
           email = data.email
        })

        await fetch(PROTOCOL+'://'+HOST+'/api/getuser',{
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
  const [fullPrice,setFullPrice] = useState(0)
  const [showPopUp, setShowPopUp] = useState(false);
  const router = useRouter();

  const CartItemsNoSSR = dynamic(
    () => import('../../components/Cart/CartItems/cartitems'),
    { ssr: false }
  );

  const TotalNoSSR = dynamic(
    () => import('../../components/UI/Checkout/total'),
    { ssr: false }
  );

  useEffect(()=>{
    var fullprice_ = 0
    items.map(item => {
      fullprice_ = fullprice_+(Number(item.price) * Number(item.qty))
    })
    setFullPrice(fullprice_)
  },[fullPrice,items])
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
    <CartItemsNoSSR namena="checkout"/><div className={styles.total}>
    <TotalNoSSR edit={true} klik={() => popUpHandler()} price={fullPrice} price2={price} rabat={user.rabat == undefined ?'0':user.rabat}/></div>
    <FinishOrder show={showPopUp} off={() => popUpHandler()}/>
    
  </>);
  return (
        <div className={styles.body}>
            <h1 className={styles.naslov}>Moja Korpa</h1>
            <div className={styles.line}></div>
            
            {items ? punakorpa : praznakorpa}
            
            
        </div>
  )
}
