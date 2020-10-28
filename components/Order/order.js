import React from 'react';
import styles from './order.module.css';
import CartItem from '../Cart/CartItems/CartItem/cartitem';
import Total from '../UI/Checkout/total';
import Input from '../UI/Input/input';
import Submit from '../UI/Button/Submit/submit';
import {useRouter} from 'next/router';
import {useState,useEffect} from 'react';
const order = (props) => {

    if(props.data.orderdata != undefined){
    var [order,setOrder] = useState(JSON.parse(props.data.orderdata).items)

    }else{
    var [order,setOrder] = useState(props.orders)
    }
    const [url,setUrl] = useState("")
    const [price,setPrice] = useState(0)
    const [userinfo,setUserinfo] = useState(props.data);
    const [zavrsen,setZavrsen] = useState("Zavrsi")
    const router = useRouter();
    useEffect(()=>{
        setUrl(router.asPath)
        if(userinfo.zavrsen == 1){
            setZavrsen("Zavrsen")
        }
        var cena = 0;
        order.map(item => {
            var newPrice = Number(item.price) * Number(item.qty)
           cena = cena+newPrice
           
        })
         setPrice(cena)
         
    },[])
    function zavrsiOrder(){
        if(zavrsen == "Zavrsi"){
           
            var formData = new FormData()
            formData.append("value",1);
            formData.append("id",userinfo.id)
            fetch('http://localhost:3000/api/finishorder',{
                method:'POST',
                body:formData
            }).then(res => res.json()).then(data => {
                if(data.result == "Success")
                setZavrsen("Zavrsen")
            })
        }else{
            var formData = new FormData()
            formData.append("value",0);
            formData.append("id",userinfo.id)
            fetch('http://localhost:3000/api/finishorder',{
                method:'POST',
                body:formData
            }).then(res => res.json()).then(data => {
                if(data.result == "Success")
                setZavrsen("Zavrsi")
            })
        }
    }
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
                {props.data.created && props.data.time ? <h3 style={{marginLeft:"100px"}}>{props.data.created+`  `+props.data.time}</h3> : null}
                
                <div className={styles.CartItems}>

                    {order.map(item => <CartItem edit={props.edit} sifra={item.sifra}
                     namena={props.namena} src={item.slika}
                      name={item.ime}
                       price={item.price} qty={item.qty} up={() => addOne(item)}
                        down={() => removeOne(item)} brisi={() => removeFromCart(item)}></CartItem>)}
                </div>
                <div className={styles.total}>
                    <Total edit={props.edit} price={price} rabat={userinfo.rabat == undefined || userinfo.rabat == "" ? '0' : userinfo.rabat}/>
                    <div className={styles.orderinfo}>
                    {/* <Input inputtype="input" label="Napomena"/> */}
                    <div className={styles.infoblock}>
                        <h3>Detalji narucioca</h3>
                        <ul>
                            {userinfo.ime_prezime == undefined ? <li>{userinfo.ime} {userinfo.prezime}</li>:
                        <li>{userinfo.ime_prezime}</li>}
                            <li>{userinfo.adresa}</li>
                            <li>{userinfo.postanski_broj} {userinfo.grad}</li>
                            <li>Serbia</li>
                            <li>{userinfo.email}</li>
                            <li>{userinfo.telefon}</li>
                        </ul>
                        {url.includes("admin") ? <span onClick={zavrsiOrder} ><Submit styles={styles.dugme} >{zavrsen}</Submit></span> : 
                    <span onClick={onSubmit}><Submit styles={styles.dugme} >Zavrsi</Submit></span>}
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