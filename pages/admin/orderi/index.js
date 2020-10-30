import React from 'react';
import styles from './proizvodi.module.css';
import Orderi from '../../../components/Admin/Orderi/orderi';
import {useState,useEffect} from 'react'
import Cookies from 'cookies';
import Filter from '../../../components/Search/Filter/filter';
import Menu from '../../../components/UI/HamburgerMenu/hamburger';

export async function getServerSideProps({req,res}){
        var HOST = process.env.HOST;
        var PROTOCOL = process.env.PROTOCOL
    var user = ""
        var email = ""
        var cookies = new Cookies(req,res)
        var authToken = cookies.get('auth-token')
        if(authToken == undefined){
            res.writeHead(307,{Location:'/login'})
             res.end();
        }
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
            if(user.rank !== "admin"){
                res.writeHead(307,{Location:'/login'})
             res.end();
            }

    //----------------------------------------------------

    const data = await fetch(PROTOCOL+'://'+HOST+'/api/getorders?zavrseni=0').then(res => res.json())
    .then(data => data)
    return {
        props:{
            data:data
        }
    }
}
const proizvodi = ({data} , props) => {
    const [orderdata,setOrderdata] = useState(data)
    const [noviColor,setNoviColor] = useState("")
    const [zavrseniColor,setZavrseniColor] = useState("")
    const [tip,setTip] = useState("novi")
    var HOST = process.env.NEXT_PUBLIC_HOST;
    var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL
    function setNovi(){
     fetch(PROTOCOL+'://'+HOST+'/api/getorders?zavrseni=0').then(res => res.json())
    .then(data => setOrderdata(data))
    setNoviColor("#F54343")
    setZavrseniColor("#2B2B2B")
    setTip("novi")
    }
    function setZavrseni(){
     fetch(PROTOCOL+'://'+HOST+'/api/getorders?zavrseni=1').then(res => res.json())
    .then(data => setOrderdata(data))
    setZavrseniColor("#F54343")
    setNoviColor("#2B2B2B")
    setTip("zavrseni")
    }
    function onChange(e){
        
        fetch(PROTOCOL+'://'+HOST+'/api/searchorder?search='+e.target.value+"&tip="+tip)
        .then(res => res.json())
        .then(data => {
           setOrderdata(data.results)
        })
    }
    return (
        <div className={styles.proizvodi}>
            <div className={styles.heading}>
                <h3>Orderi</h3>
                <button onClick={setNovi} className={styles.novi} style={{color:noviColor}}>Novi</button>
                <button onClick={setZavrseni} className={styles.zavrseni} style={{color:zavrseniColor}}>Zavrseni</button>
                <Filter change={e => onChange(e)} placeholder="Pretrazi ordere..."></Filter>
            </div>
            <Orderi orders={orderdata}/>
        </div>
    );
}

export default proizvodi;