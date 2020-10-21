import React from 'react';
import styles from './order.module.css';
import CartItem from '../Cart/CartItems/CartItem/cartitem';
import Total from '../UI/Checkout/total';
import Input from '../UI/Input/input';
import Submit from '../UI/Button/Submit/submit';
import {useRouter} from 'next/router';
import {useState,useEffect} from 'react';
const order = (props) => {
    const [order,setOrder] = useState(JSON.parse(props.data.orderdata).items)
    const [price,setPrice] = useState(0)
    const [userinfo,setUserinfo] = useState(props.data);
    const router = useRouter();
    useEffect(()=>{
        
        
        order.map(item => {
            var newPrice = Number(item.price) * Number(item.qty)
            var oldPrice = price
            setPrice(newPrice+oldPrice)
        })
    },[])
    function onSubmit(){
        var formData_ = new FormData();
        formData_.append("postData",JSON.stringify(props.data));
         fetch('/api/addorder',{
            method:'POST',
            body:formData_
         }).then(res => res.json()).then(data => {
            if(data.result == "Success"){
                alert("Uspesno")
                router.push("/")
            }
         })
    }
    return(
        <>
            <div className={styles.row}>
                <div className={styles.CartItems}>
                    {order.map(item => <CartItem edit={props.edit} sifra={item.sifra}
                     namena={props.namena} src={item.slika}
                      name={item.ime}
                       price={item.price} qty={item.qty} up={() => addOne(item)}
                        down={() => removeOne(item)} brisi={() => removeFromCart(item)}></CartItem>)}
                   
                </div>
                <div className={styles.total}>
                    <Total edit={props.edit} price={price} rabat="10"/>
                    <div className={styles.orderinfo}>
                    {/* <Input inputtype="input" label="Napomena"/> */}
                    <div className={styles.infoblock}>
                        <h3>Detalji narucioca</h3>
                        <ul>
                            <li>{userinfo.ime} {userinfo.prezime}</li>
                            <li>{userinfo.adresa}</li>
                            <li>{userinfo.postanski_broj} {userinfo.grad}</li>
                            <li>Serbia</li>
                            <li>{userinfo.email}</li>
                            <li>{userinfo.telefon}</li>
                        </ul>
                        <span onClick={onSubmit}><Submit styles={styles.dugme} >Zavrsi</Submit></span>
                    </div>
                </div>
                </div>
                
            </div>
            {/* <div className={styles.row}>
                <div className={styles.line}></div>
                
                
            </div> */}
        </>
    );
}

export default order;