import styles from "../../styles/webshop.module.css";
import Products from '../../components/products/products';
import Link from 'next/link';

export default function Traktori() {
  return (
    <div className={styles.container}>
      
        <div className={styles.body}>
            <Link href="/webshop"><h1 className={styles.naslov}>{"<- WEBSHOP"}</h1></Link>
            <h3 className={styles.naslovmanji}>DELOVI ZA POLJOPRIVREDNE MASINE</h3>
            <div className={styles.line}></div>
            <Products/>
        </div>
       

    </div>
  )
}
