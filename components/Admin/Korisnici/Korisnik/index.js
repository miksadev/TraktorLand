import React from 'react';
import styles from './korisnik.module.css';
import Link from 'next/link';
import {useState} from 'react';
const korisnik = (props) => {
    const [rabat,setRabat] = useState(props.rabat)

    function onChange(e){
        setRabat(e.target.value)
        
        var formData = new FormData()
        formData.append("id",e.target.name)
        formData.append("rabat",e.target.value)
        fetch("http://localhost:3000/api/changerabat",{
            method:"POST",
            body:formData
        }).then(res => res.json()).then(data => {
            if(data.result == "Success"){
                
            }
        })
       
    }
    function deleteUser(e){
        var id = e.target.name
        var formData = new FormData()
        formData.append("id",id)
        fetch("http://localhost:3000/api/deleteuser",{
            method:"POST",
            body:formData
        }).then(res => res.json()).then(data => {
            if(data.result == "Success"){
                props.deletefunc()
                alert("Korisnik je obrisan")
            }
        })
    }
    return (
        <div className={styles.korisnik}>
            <div className={styles.datum}>
                Datum kreiranja: {props.datum}
            </div>
            <div className={styles.ime}>
                {props.ime}
            </div>
            <div className={styles.adresa}>
                {props.adresa}
            </div>
            <div className={styles.rabat}>
                <div className={styles.box}>
                    <input onChange={e => onChange(e)} type="text" name={props.id} style={{width:"100%",border:"none",textAlign:"center"}} value={rabat} />
                </div>
                <h3 className={styles.proc}>
                    Rabat (%)
                </h3>
            </div>
            { /* <Link href="/admin/korisnici/edit"><img className={styles.edit} src="/admin/edit.png" alt=""/></Link> */}
            <img onClick={e => deleteUser(e)} name={props.id} className={styles.delete} src="/admin/delete.png" alt=""/>
        </div>
    );
}

export default korisnik;