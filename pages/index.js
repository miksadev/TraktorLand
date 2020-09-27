import styles from '../styles/Home.module.css';
import Coninfo from '../components/UI/contactinfo/contactinfo';
import Logowide from '../components/UI/logowide';
import Kategorije from '../components/categories/kategorije';
import Slider from '../components/Slider/slider';

export default function Home() {

  

  return (
    <div className={styles.container}>
     
      {/* <Header/> */}
      <div className={styles.body}>
        <Coninfo/>
        
        <div className={styles.logowide}>
        <Logowide />
        </div>

        <p className={styles.slogan}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni assumenda minima vero quaerat corporis unde obcaecati dolorum labore.</p>
        <img className={styles.traktor} src="traktor.png" alt=""/>

        <Kategorije/>

        <div className={styles.carousell}>
          <h3>PROIZVODJACI</h3>
          <Slider/>
        </div>
       
      </div>

      {/* <Footer/> */}
      

    </div>
  )
}
