import styles from "./webshop.module.css";
import Products from '../../components/products/products';

export default function Traktori() {
  return (
    <div className={styles.container}>
      
        <div className={styles.body}>
            <h1 className={styles.naslov}>WEBSHOP</h1>
            <h3 className={styles.naslovmanji}>DELOVI ZA POLJOPRIVREDNE MASINE</h3>
            <div className={styles.line}></div>

            <Products/>
            <Products/>
        </div>
       

    </div>
  )
}
