import React from 'react';
import styles from './proizvodi.module.css';
import Proizvod from './Proizvod/proizvod';
import {useState,useEffect} from 'react';
const proizvodi = (props) => {
    const [allPro,setAllPro] = useState(props.data) 
    const [loading,setLoading] = useState()
   
    useEffect(() => {
        setAllPro(props.data)
    },[props.data])
    function refreshData(){
         fetch('/api/get').then(res => res.json()).then(data => {
            
            setAllPro(data)
        })
    }
    
    
    return(
        <div className={styles.proizvodi}>
            {loading ? <h3 style={{textAlign:"center"}}>LOADING</h3> : 

        allPro.map(item => <Proizvod refresh={e => refreshData(e)} key={item['id']} id={item['id']} sifra={item["sifra"]} src={item["thumb"]} name={item["ime"]}
         price={item["mp_cena"]} kolicina={item['kolicina']} zemlja_porekla={item['zemlja_porekla']} 
         url={'/admin/proizvodi/edit?id='+item['id']}></Proizvod>)}
       </div>
        )
}


export default proizvodi;


