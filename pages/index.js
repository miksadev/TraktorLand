import styles from '../styles/home.module.css';
import Coninfo from '../components/UI/ContactInfo/contactinfo';
import Logowide from '../components/UI/Logo/logowide';
import Kategorije from '../components/Kategorije/kategorije';
import Kartice from '../components/Kartice/kartice';
import Swiper from '../components/Slider/swiper';

export async function getServerSideProps({req,res}){
  var HOST = process.env.HOST;
  var PROTOCOL = process.env.PROTOCOL
  const data = await fetch(PROTOCOL+"://"+HOST+"/api/getakcije").
  then(res => res.json()).then(data => {
    return data;
  })
 
  return{
    props:{
      akcije:data.data,
    }
  }
}
export default function Home({akcije,catdata}) {

  return (
    <>
      
      <div className={styles.body}>
      <img className={styles.traktor} src="traktor.svg" alt=""/>
        <Coninfo/>
        
        <div className={styles.logowide}>
          <Logowide styles={styles.logowidee}/>
        </div>

        <p className={styles.slogan}>Profesionalni i originalni već 25 godina!</p>
        

        <Kategorije/>
        <Kartice/>

        <div className={styles.carousell}>
          <h3>PROIZVODI NA AKCIJI</h3>
          <Swiper akcije={akcije}/>
        </div>
       
      </div>
      </>
  )
}
