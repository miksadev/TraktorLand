import React from 'react';
import styles from './proizvodi.module.css';
import Orderi from '../../../components/Admin/Orderi/orderi';
import {useState,useEffect} from 'react'
import Cookies from 'cookies';
import Filter from '../../../components/Search/Filter/filter';

export async function getServerSideProps({req,res}){

    var user = ""
        var email = ""
        var cookies = new Cookies(req,res)
        var authToken = cookies.get('auth-token')
        if(authToken == undefined){
            res.writeHead(307,{Location:'/login'})
             res.end();
        }
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
            if(user.rank !== "admin"){
                res.writeHead(307,{Location:'/login'})
             res.end();
            }

    //----------------------------------------------------

    const data = await fetch('http://localhost:3000/api/getorders?zavrseni=0').then(res => res.json())
    .then(data => data)
    return {
        props:{
            data:data
        }
    }
}
const proizvodi = ({data}) => {
    const [orderdata,setOrderdata] = useState(data)
    const [noviColor,setNoviColor] = useState("")
    const [zavrseniColor,setZavrseniColor] = useState("")
    const [tip,setTip] = useState("novi")
    function setNovi(){
     fetch('http://localhost:3000/api/getorders?zavrseni=0').then(res => res.json())
    .then(data => setOrderdata(data))
    setNoviColor("#F54343")
    setZavrseniColor("#2B2B2B")
    setTip("novi")
    }
    function setZavrseni(){
     fetch('http://localhost:3000/api/getorders?zavrseni=1').then(res => res.json())
    .then(data => setOrderdata(data))
    setZavrseniColor("#F54343")
    setNoviColor("#2B2B2B")
    setTip("zavrseni")
    }
    function onChange(e){
        
        fetch('http://localhost:3000/api/searchorder?search='+e.target.value+"&tip="+tip)
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