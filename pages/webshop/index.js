import styles from "../../styles/webshop.module.css";
import Kategorije from '../../components/Kategorije/kategorije';
import {useEffect} from 'react'
export default function Webshop(props) {
  return (
    <div className={styles.container}>

        <div className={styles.body}>
            <h1 className={styles.naslov}>WEBSHOP</h1>
            <div className={styles.line}></div>
            <h3 className={styles.naslov2}>KATEGORIJE</h3>
            <Kategorije cat={props.data}/>
        </div>
       

    </div>
  )
}
export async function getServerSideProps({req,res}){
    var HOST = process.env.NEXT_PUBLIC_HOST;
    var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
    var data = await fetch(PROTOCOL+"://"+HOST+"/api/getcategory").then(res => res.json())
    .then(data => data)
    return{
        props:data
    }
}