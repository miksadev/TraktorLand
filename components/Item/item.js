import React, {useEffect} from 'react';
import styles from './item.module.css';
import Wrapper from '../UI/ItemWrapper/itemWrapper';
import AddToCart from '../UI/Button/AddToCart/atcbutton';
import { useRouter } from 'next/router'
import Link from 'next/link';
import useCart from '../../util/useCart';


const item = (props) => {
    const router = useRouter();
    const {isItemOpened, toggleItem} = useCart();
    var back = router.query.tip[0];

    useEffect(() => {
        {isItemOpened ? null : toggleItem()}
        
    }, []);


    return(
    <>
        <Wrapper/>
        { isItemOpened ?
            <div className={styles.item}>
            {/* <Link href={'/webshop/'+back} style={{float:"right"}}><a>close</a></Link> */}
                <h3 className={styles.name}>{props.proizvod[0].ime}</h3>
                <div>
                    <img className={styles.img} src={props.proizvod[0].thumb ? props.proizvod[0].thumb : "/product.png"} alt=""/>
                    <div className={styles.cena}>
                        <p>Maloprodajna cena</p>
                        <h3 className={styles.ukupnocena}>{props.proizvod[0].mp_cena ? props.proizvod[0].mp_cena : 70800} <span>RSD</span></h3>
                    </div>
                    <div className={styles.cena}>
                        <p>Veleprodajna cena</p>
                        <h3 className={styles.ukupnocena}>{props.proizvod[0].vp_cena ? props.proizvod[0].vp_cena : 59900} <span>RSD</span></h3>
                    </div>
                    <AddToCart styles={styles.atcbutton} item={{id:props.proizvod[0].id, ime: props.proizvod[0].proizvodjac,slika: props.proizvod[0].thumb, price: Number(props.proizvod[0].mp_cena), qty: 1}}/>
                </div>
                <div className={styles.line}/>
                    <div className={styles.block}>
                        <p className={styles.levo}>Kataloski broj</p>
                        <h3 className={styles.desno}>{props.proizvod[0].kataloski_broj}</h3>
                    </div>
                    <div className={styles.block}>
                        <p className={styles.levo}>Sifra</p>
                        <h3 className={styles.desno}>{props.proizvod[0].sifra}</h3>
                    </div>
                    <div className={styles.block}>
                        <p className={styles.levo}>Proizvodjac</p>
                        <h3 className={styles.desno}>{props.proizvod[0].ime}</h3>
                    </div>
                    <div className={styles.block}>
                        <p className={styles.levo}>Kataloski broj</p>
                        <h3 className={styles.desno}>{props.proizvod[0].kataloski_broj}</h3>
                    </div>
                </div>
                : null
        }
        
    </>
        
    );
}

export default item;