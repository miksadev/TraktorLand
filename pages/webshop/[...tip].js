import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from "../../styles/webshop.module.css";
import Products from '../../components/products/products';


function Webshop(props){
	
	const router = useRouter()
  	const tip = router.query.tip
	var upLett = ["traktori","beraci","freze","kombajni"];
    
	var par = props.param
	

	var naslov = ""
	
	if(upLett.includes(par)){
		naslov = par.charAt(0).toUpperCase() + par.slice(1)
	}else if(par == "delovi"){
		naslov = "Delovi za poljoprivredne masine"
	}else{
		naslov = "Poljoprivredna mehanizacija"
	}
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
	var param = context.query.tip[0]
	var mData = "empty"
	if(context.query.tip[1] != undefined){
		var mParam = context.query.tip[1]
		var mData = await fetch(`http://localhost:3000/api/get?id=`+mParam).
		then(res => res.json()).then(data =>data)
	}
	var data = await fetch(`http://localhost:3000/api/get?tip=`+param).
	then(res => res.json()).then(data =>data)
	return{
		props:{
			data,
			mData,
			param:param
		}
	}
	
}
export default Webshop