import React, {useState,useEffect} from 'react';
import styles from './item.module.css';
import Wrapper from '../UI/ItemWrapper/itemWrapper';
import AddToCart from '../UI/Button/AddToCart/atcbutton';
import { useRouter } from 'next/router'
import Link from 'next/link';
import useCart from '../../util/useCart';


const item = (props) => {
    const router = useRouter();
    const [quantity, setQty] = useState(props.proizvod[0].qty == 0 ? 0 : 1);
    const {isItemOpened, toggleItem, undItem} = useCart();
    var back = router.query.tip[0];

    const onChangeHandler = (e) => {
        if(e.target.value > props.proizvod[0].qty){
            setQty(props.proizvod[0].qty);
        }
        else{
            setQty(e.target.value);
        }
    }

    useEffect(() => {
        if(isItemOpened != null){
            if(!isItemOpened){
              window.history.back();
               
        }
        }
    },[isItemOpened])
    useEffect(() => {
        {isItemOpened ? null : toggleItem()}
        return ()=>{
            undItem();
        }
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
                        <h3 className={styles.ukupnocena}>{props.proizvod[0].price ? Number(props.proizvod[0].price*1.2).toFixed(2) : 70800} <span>RSD</span></h3>
                    </div>
                    <div className={styles.cena}>
                        <p>Veleprodajna cena</p>
                        <h3 className={styles.ukupnocena}>{props.proizvod[0].vp_cena ? props.proizvod[0].vp_cena : Number(props.proizvod[0].price).toFixed(2)} <span>RSD</span></h3>
                    </div>
                    <input onChange={(event) => onChangeHandler(event)} className={styles.input} type="number" value={quantity} name="kolicina" placeholder="1" min={props.proizvod.kolicina == 0 ? 0 : 1} max={props.proizvod[0].qty}/>
                     <AddToCart user={props.user} styles={styles.atcbutton} item={{id:props.proizvod[0].productid, rabat_1: props.proizvod[0].rabat_1, rabat_2: props.proizvod[0].rabat_2, rabat_3: props.proizvod[0].rabat_3, ime: props.proizvod[0].name,slika: props.proizvod[0].thumb,sifra: props.proizvod[0].code, price: Number(props.proizvod[0].price*1.2).toFixed(2), qty: quantity}}/>
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