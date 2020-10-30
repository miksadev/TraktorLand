import styles from '../../../styles/login.module.css';
import Form from '../../../components/Form/form';
import Input from '../../../components/UI/Input/input';
import Submit from '../../../components/UI/Button/Submit/submit';
import Cookies from 'cookies'
import useCart from '../../../util/useCart';
import {useState,useEffect,useRef } from 'react'
export async function getServerSideProps({req,res}){
    var HOST = process.env.HOST;
    var PROTOCOL = process.env.PROTOCOL
    var user = ""
    var email = ""
    var cookies = new Cookies(req,res)
    var authToken = cookies.get('auth-token')
    if(authToken != undefined){
        await fetch(PROTOCOL+'://'+HOST+'/api/checkauth',{headers:{'auth-token':authToken}})
        .then(res => res.json()).then(data => {
            email = data.email
        })

        await fetch(PROTOCOL+'://'+HOST+'/api/getuser',{
            method:'POST',
            body:JSON.stringify({email:email})
        }).then(res => res.json()).then(data => {
            user = data.user
        })
    }else{
        user = {
        ime:"",
        prezime:"",
        telefon:"",
        email:"",
        adresa:"",
        grad:"",
        postanski_broj:""
    }
    }
    
    return{
        props:{
            user:user
        }
    }
}
export default function Kontakt({user}) {
    const [user_,setUser] = useState(user);
    const [orderdata,setOrderdata] = useState({})
    const [inputEmpty,setInputEmpty] = useState({
        ime:false,
        prezime:false,
        telefon:false,
        email:false,
        adresa:false,
        grad:false,
        postanski_broj:false
    })
    const { price, items } = useCart();
    const submitRef = useRef(null)
    useEffect(() => {

        var newOrderdata = {...orderdata}
        newOrderdata.items = items
        setOrderdata(newOrderdata)
    },[items])
     function onChange(e){
        var newUser = {...user_}
        newUser[e.target.name] = e.target.value
        setUser(newUser)
        var newOrderdata = {...orderdata}
        newOrderdata.user = newUser
        setOrderdata(newOrderdata)
    }
    function submitMask(e){

        var newInput = {...inputEmpty}
        var err = 0;
        delete user_["pravno_lice"]
        
        for(var key in user_){
            if(user_[key] === ""){
                
                newInput[key] = true
             
                err++
            }
        }
        
        setInputEmpty(newInput)

        if(err != 0){
            e.preventDefault()
        }
    }
    function onFocus(e){
        var newInput = {...inputEmpty}
        newInput[e.target.name] = false
        setInputEmpty(newInput)
    }
  return (
    <div className={styles.container}>
        <div className={styles.body}>
        <form method="POST" action="/checkout/order">
            <Form formname="Detalji Narudzbine">
                <Input onFocus={e => onFocus(e)} style={inputEmpty.ime ? {borderBottom:'1px solid red'} : {}} onChange={e => onChange(e)}   inputtype="input"  label="Ime" placeholder="npr. Petar" value={user_.ime} name="ime" type="text"></Input>
                <Input onFocus={e => onFocus(e)} style={inputEmpty.prezime ? {borderBottom:'1px solid red'} : {}} onChange={e => onChange(e)}   inputtype="input"  label="Prezime" placeholder="npr. Petrovic" name="prezime" value={user_.prezime} type="text"></Input>
                <Input onFocus={e => onFocus(e)} style={inputEmpty.telefon ? {borderBottom:'1px solid red'} : {}} onChange={e => onChange(e)}  inputtype="input"  label="Telefon" placeholder="npr. 060/123/45-67" name="telefon" value={user_.telefon} type="text"></Input>
                <Input onFocus={e => onFocus(e)} style={inputEmpty.email ? {borderBottom:'1px solid red'} : {}} onChange={e => onChange(e)}   inputtype="input"  label="E-mail" placeholder="npr. vasaadresa@gmail.com" name="email" value={user_.email} type="email"></Input>
                <div className={styles.line}></div>
                <Input onFocus={e => onFocus(e)} style={inputEmpty.adresa ? {borderBottom:'1px solid red'} : {}} onChange={e => onChange(e)}   inputtype="input"  label="Adresa" placeholder="npr. Cara Dusana 26" value={user_.adresa} name="adresa" type="text"></Input>
                <Input onFocus={e => onFocus(e)} style={inputEmpty.grad ? {borderBottom:'1px solid red'} : {}} onChange={e => onChange(e)}  inputtype="input"  label="Grad" placeholder="npr. Beograd" name="grad" value={user_.grad} type="text"></Input>
                <Input onFocus={e => onFocus(e)} style={inputEmpty.postanski_broj ? {borderBottom:'1px solid red'} : {}} onChange={e => onChange(e)}  inputtype="input"  label="Postanski br." placeholder="npr. 11000" name="postanski_broj" value={user_.postanski_broj} type="text"></Input>
               <input type="hidden" value={JSON.stringify(orderdata)} name="orderdata" />
               <input type="hidden" name="rabat" value={user_.rabat} />
                {/* <div className={styles.line}></div> */}
                <div className={styles.block}  onClick={e => submitMask(e)}><Submit styles={styles.loginbutton} >Zavrsi narudzbinu</Submit></div>
            </Form>
        </form>
        </div>
    </div>
  );
}
