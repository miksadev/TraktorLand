import React from 'react';
import styles from './item.module.css';
import Wrapper from '../UI/Wrapper/wrapper';
import AddToCart from '../UI/Button/AddToCart/atcbutton';

const item = (props) => {
    return(
    <>
        <Wrapper/>
        <div className={styles.item}>
            <h3 className={styles.name}>{props.name ? props.name : "Sunce rotacioni sakupljac komplet"}</h3>
            <div>
                <img className={styles.img} src={props.src ? props.src : "/product.png"} alt=""/>
                <div className={styles.cena}>
                    <p>Maloprodajna cena</p>
                    <h3 className={styles.ukupnocena}>{props.price ? props.price : 70800} <span>RSD</span></h3>
                </div>
                <div className={styles.cena}>
                    <p>Veleprodajna cena</p>
                    <h3 className={styles.ukupnocena}>{props.price ? props.price : 59900} <span>RSD</span></h3>
                </div>
                <AddToCart styles={styles.atcbutton} item={{id:props.id, ime: props.name,slika: props.src, price: Number(props.price), qty: 1}}/>
            </div>
            <div className={styles.line}/>
                <div className={styles.block}>
                    <p className={styles.levo}>Kataloski broj</p>
                    <h3 className={styles.desno}>021456</h3>
                </div>
                <div className={styles.block}>
                    <p className={styles.levo}>Sifra</p>
                    <h3 className={styles.desno}>#533255</h3>
                </div>
                <div className={styles.block}>
                    <p className={styles.levo}>Proizvodjac</p>
                    <h3 className={styles.desno}>Ime proizvodjaca</h3>
                </div>
                <div className={styles.block}>
                    <p className={styles.levo}>Kataloski broj</p>
                    <h3 className={styles.desno}>021456</h3>
                </div>
            </div>
    </>
        
    );
}

export default item;