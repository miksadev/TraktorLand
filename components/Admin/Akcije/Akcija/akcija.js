import React from 'react';
import styles from './akcija.module.css';
import Link from 'next/link';

const akcija = (props) => {
	function deleteAkcija(e){
		var id = e.target.getAttribute('data-id')
		var formData = new FormData()
		formData.append("id",id)
		fetch('http://localhost:3000/api/deleteakcija',{
			method:"POST",
			body:formData
		}).then(res => res.json()).then(data => {
			if(data.result == "Success"){
				alert("Akcija je obrisana");
				props.refreshfunc()
			}
		})
	}
    return (
        <div className={styles.akcija}>
            <img className={styles.slika} src={props.img} alt=""/>
            <h2>{props.ime}</h2>
            <h3>Sifra: #{props.sifra}</h3>
            <Link href={`/admin/akcija/edit/`+props.id}><img className={styles.edit} src="/admin/edit.png" alt=""/></Link>
            <img onClick={e => deleteAkcija(e)} data-id={props.id} className={styles.delete} src="/admin/delete.png" alt=""/>
        </div>
    );
}

export default akcija;