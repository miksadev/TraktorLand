import React from 'react';
import styles from './proizvod.module.css';
import Link from 'next/link';

const proizvod = (props) => {
    function deleteProizvod(e){
        var HOST = process.env.NEXT_PUBLIC_HOST;
        var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL
        var id = e.target.name
        var formData = new FormData()
        formData.append("id",id)
        fetch(PROTOCOL+"://"+HOST+"/api/deleteproizvod",{
            method:"POST",
            body:formData
        }).then(res => res.json()).then(data => {
            if(data.result == "Success"){
                props.refresh()
                alert("Proizvod je obrisan")
            }
        })
    }
    return (
        <div className={styles.proizvod}>
            <p className={styles.sifra}>Sifra: <span>{props.sifra}</span></p>
            <img className={styles.img} src={props.src} alt=""/>
            <p className={styles.name}>{props.name}</p>
            <p className={styles.price}>{props.price} RSD</p>   
            {/* <p className={styles.kolicina}>{props.kolicina}</p> */}
            <Link href={props.url}><img className={styles.edit} src="/admin/edit.png" alt=""/></Link>
            <img onClick={e => deleteProizvod(e)} name={props.id} className={styles.delete} src="/admin/delete.png" alt=""/>
              
        </div>
    );
}

export default proizvod;