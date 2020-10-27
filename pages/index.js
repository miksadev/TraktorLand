import styles from '../styles/home.module.css';
import Coninfo from '../components/UI/ContactInfo/contactinfo';
import Logowide from '../components/UI/Logo/logowide';
import Kategorije from '../components/Kategorije/kategorije';
import Slider from '../components/Slider/slider';
import dynamic from 'next/dynamic';

export async function getServerSideProps({req,res}){
  const data = await fetch("http://localhost:3000/api/getakcije").
  then(res => res.json()).then(data => {
    return data;
  })
  return{
    props:{
      akcije:data.data
    }
  }
}
export default function Home({akcije}) {

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
          <Logowide />
        </div>

        <p className={styles.slogan}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni assumenda minima vero quaerat corporis unde obcaecati dolorum labore.</p>
        

        <Kategorije/>

        <div className={styles.carousell}>
          <h3>PROIZVODI NA AKCIJI</h3>
          {/* <DynamicComponentWithNoSSR akcije={akcije}/> */}
        </div>
       
      </div>

      {/* <Footer/> */}
      </>
  )
}
