import React from 'react';
import styles from './add.module.css';
import Input from '../../../../components/UI/Input/input';
import Link from 'next/link';

const add = () => {
    return (
        <div className={styles.proizvodi}>
            <div className={styles.heading}>
                <h3>Proizvodi</h3>
            </div>
            <form className={styles.additemforma} action="">
                <input className={styles.inputfile} type="file" name="" id=""/>
                <img className={styles.upload} src="/admin/upload.png" alt=""/>
                <Input inputtype="input" requiered label="Ime"  type="text"/>
                <Input inputtype="input" requiered label="Proizvodjac"  type="text"/>
                <Input inputtype="input" requiered label="Kataloski broj"  type="text"/>
                <Input inputtype="input" requiered label="Sifra"  type="text"/>
                <Input inputtype="input" requiered label="MP cena"  type="text"/>
                <Input inputtype="input" requiered label="VP cena"  type="text"/>
            </form>
            <Link href="/admin/proizvodi"><h2 className={styles.nazad}>{"< Nazad"}</h2></Link>
            
            
            
        </div>
    );
}

export default add;
