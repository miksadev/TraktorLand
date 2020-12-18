import React, {useEffect} from 'react';
import styles from './item.module.css';
import Wrapper from '../UI/ItemWrapper/itemWrapper';
import AddToCart from '../UI/Button/AddToCart/atcbutton';
import { useRouter } from 'next/router'
import Link from 'next/link';
import useCart from '../../util/useCart';


const item = (props) => {
    const router = useRouter();
    const {isItemOpened, toggleItem, undItem} = useCart();
    var back = router.query.tip[0];

    
    useEffect(() => {
        if(isItemOpened != null){
            if(!isItemOpened){
               router.push(props.backroute)
               undItem();
        }
        }
    },[isItemOpened])
    useEffect(() => {
        {isItemOpened ? null : toggleItem()}
        
    }, []);

    return(
    <>
        <Wrapper/>
        { isItemOpened ?
            <div className={styles.item}>
                <img onClick={toggleItem} className={styles.x} src="/header/x.png" alt=""/>
            {/* <Link href={'/webshop/'+back} style={{float:"right"}}><a>close</a></Link> */}
                <h3 className={styles.name}>{props.proizvod[0].name}</h3>
                <div>
                    <img className={styles.img} src={props.proizvod[0].thumb ? props.proizvod[0].thumb : "/product.png"} alt=""/>
                    <div className={styles.cena}>
                        <p>Maloprodajna cena</p>
                        <h3 className={styles.ukupnocena}>{props.proizvod[0].price ? props.proizvod[0].price : 70800} <span>RSD</span></h3>
                    </div>
                    <div className={styles.cena}>
                        <p>Veleprodajna cena</p>
                        <h3 className={styles.ukupnocena}>{props.proizvod[0].vp_cena ? props.proizvod[0].vp_cena : "Nema"} <span>RSD</span></h3>
                    </div>
                     <AddToCart user={props.user} styles={styles.atcbutton} item={{id:props.proizvod[0].productid, kolicina: props.proizvod[0].qty, rabat_1: props.proizvod[0].rabat_1, rabat_2: props.proizvod[0].rabat_2, rabat_3: props.proizvod[0].rabat_3, ime: props.proizvod[0].manufname,slika: props.proizvod[0].thumb,sifra: props.proizvod[0].code, price: Number(props.proizvod[0].price), qty: 1}}/>
                </div>
                <div className={styles.line}/>
                    <div className={styles.block}>
                        <p className={styles.levo}>Kataloški broj</p>
                        <h3 className={styles.desno}>{props.proizvod[0].kataloski_broj}</h3>
                    </div>
                    <div className={styles.block}>
                        <p className={styles.levo}>Šifra</p>
                        <h3 className={styles.desno}>{props.proizvod[0].code}</h3>
                    </div>
                    <div className={styles.block}>
                        <p className={styles.levo}>Proizvođac</p>
                        <h3 className={styles.desno}>{props.proizvod[0].name}</h3>
                    </div>
                    {props.proizvod[0].zemlja_porekla == null  || props.proizvod[0].zemlja_porekla ==  "" ? "" : <div className={styles.block}>
                        <p className={styles.levo}>Zemlja porekla</p>
                        <h3 className={styles.desno}>{props.proizvod[0].zemlja_porekla}</h3>
                    </div>}
                    <div className={styles.block}>
                        <p className={styles.levo}>Kataloški broj</p>
                        <h3 className={styles.desno}>{props.proizvod[0].kataloski_broj}</h3>
                    </div>
                </div>
                : null
        }
        
    </>
        
    );
}

export default item;