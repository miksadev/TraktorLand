import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from "../../styles/webshop.module.css";
import Products from '../../components/products/products';
import {useState} from 'react';
import Filter from '../../components/Search/Filter/filter';

function Webshop(props){
	const [prodata,setProdata] = useState(props.data)
	const router = useRouter()
  	const tip = router.query.tip
	var upLett = ["traktori","berači","freze","kombajni"];
    
	var par = props.param
	

	var naslov = ""
	
	if(upLett.includes(par.toLowerCase())){
		naslov = par.charAt(0).toUpperCase() + par.slice(1)
	}else if(par == "delovi"){
		naslov = "Delovi za poljoprivredne mašine"
	}else{
		naslov = "Poljoprivredna mehanizacija"
	}
	function onChange(e){
		var HOST = process.env.NEXT_PUBLIC_HOST;
		var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
		fetch(PROTOCOL+'://'+HOST+'/api/searchtip?search='+e.target.value+"&tip="+par)
        .then(res => res.json())
        .then(data => {
           setProdata(data.results)
        })
	}
	return (
			<div className={styles.container}>
      
		        <div className={styles.body}>
		            <Link href="/webshop"><h1 className={styles.naslov}>{"<- WEBSHOP"}</h1></Link>
		            
		            <h3 className={styles.naslovmanji}>
		            	{naslov}
		            </h3>
					<Filter styles={styles.filter} change={e => onChange(e)} placeholder="Pretrazi proizvode..."></Filter>
		            <div className={styles.line}></div>
		            <Products backroute={props.param} data={prodata} mdata={props.mData}/>
		        </div>
		       

		    </div>
		)
}
export async function getServerSideProps(context){
	var HOST = process.env.NEXT_PUBLIC_HOST;
	var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
	var backroute = "";
	if(context.query.s != undefined){
		backroute = "/search/"+context.query.s
	}else{
		backroute = context.query.tip[0]
	}
	var param = context.query.tip[0]
	var mData = "empty"
	if(context.query.tip[1] != undefined){
		var mParam = context.query.tip[1]
		var mData = await fetch(PROTOCOL +'://'+HOST+`/api/get?id=`+mParam).
		then(res => res.json()).then(data =>data)
	}
	var data = await fetch(PROTOCOL +'://'+HOST+`/api/get?tip=`+param).
	then(res => res.json()).then(data =>data)
	return{
		props:{
			data,
			mData,
			param:backroute
		}
	}
	
}
export default Webshop
