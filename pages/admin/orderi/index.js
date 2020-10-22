import React from 'react';
import styles from './proizvodi.module.css';
import Orderi from '../../../components/Admin/Orderi/orderi';
import {useState,useEffect} from 'react'
export async function getServerSideProps(){
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
    function setNovi(){
     fetch('http://localhost:3000/api/getorders?zavrseni=0').then(res => res.json())
    .then(data => setOrderdata(data))
    setNoviColor("#F54343")
    setZavrseniColor("#2B2B2B")

    }
    function setZavrseni(){
     fetch('http://localhost:3000/api/getorders?zavrseni=1').then(res => res.json())
    .then(data => setOrderdata(data))
    setZavrseniColor("#F54343")
    setNoviColor("#2B2B2B")
    
    }
    return (
        <div className={styles.proizvodi}>
            <div className={styles.heading}>
                <h3>Orderi</h3>
                <button onClick={setNovi} className={styles.novi} style={{color:noviColor}}>Novi</button>
                <button onClick={setZavrseni} className={styles.zavrseni} style={{color:zavrseniColor}}>Zavrseni</button>
            </div>
            <Orderi orders={orderdata}/>
        </div>
    );
}

export default proizvodi;