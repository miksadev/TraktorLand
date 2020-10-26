import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from "../../styles/webshop.module.css";
import Products from '../../components/products/products';


function Webshop(props){
	
	const router = useRouter()
  	
    
	var par = props.param
	

	var naslov = ""
	
	
	return (
			<div className={styles.container}>
      
		        <div className={styles.body}>
		            <Link href="/webshop"><h1 className={styles.naslov}>{"<- WEBSHOP"}</h1></Link>
		            <h3 className={styles.naslovmanji}>
		            	{naslov}

		            </h3>
		            <div className={styles.line}></div>
		            <Products backroute={props.param} data={props.data} mdata={props.mData}/>
		        </div>
		       

		    </div>
		)
}
export async function getServerSideProps(context){
	var data = await fetch("http://localhost:3000/api/search?search="+context.query.search)
	.then(res => res.json()).then(data => data.results)
	return{
		props:{
			data:data,
			mData:"empty"
		}
	}
	
}
export default Webshop