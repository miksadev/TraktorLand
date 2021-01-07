import styles from '../styles/home.module.css';
import Coninfo from '../components/UI/ContactInfo/contactinfo';
import Logowide from '../components/UI/Logo/logowide';
import Kategorije from '../components/Kategorije/kategorije';
import Slider from '../components/Slider/slider';
import dynamic from 'next/dynamic';

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

  const DynamicComponentWithNoSSR = dynamic(
    () => import('../components/Slider/slider'),
    { ssr: false }
  );

  return (
    <>
      {/* <Header/> */}
      
      <div className={styles.body}>
      <img className={styles.traktor} src="traktor.png" alt=""/>
        <Coninfo/>
        
        <div className={styles.logowide}>
          <Logowide styles={styles.logowidee}/>
        </div>

        <p className={styles.slogan}>Profesionalni i originalni već 25 godina!</p>
        

        <Kategorije/>

        <div className={styles.carousell}>
          <h3>PROIZVODI NA AKCIJI</h3>
          <DynamicComponentWithNoSSR akcije={akcije}/>
        </div>
       
      </div>

      {/* <Footer/> */}
      </>
  )
}
