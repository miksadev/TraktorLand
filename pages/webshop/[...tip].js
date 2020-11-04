import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from "../../styles/webshop.module.css";
import Products from '../../components/products/products';
import {useState,useEffect} from 'react';
import Filter from '../../components/Search/Filter/filter';

function Webshop(props){
	const [prodata,setProdata] = useState(props.data)
	const [searchKolona,setSearchKolona] = useState("ime")
	const [searchValue,setSearchValue] = useState("");
	const router = useRouter()
  	const tip = router.query.tip
	var upLett = ["traktori","beraci","freze","kombajni","ostalo"];
    
	var par = props.param
	

	var naslov = ""
	
	useEffect(() => {
		var HOST = process.env.NEXT_PUBLIC_HOST;
		var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
		fetch(PROTOCOL +'://'+HOST+`/api/get?tip=`+par)
        .then(res => res.json())
        .then(data => {
           setProdata(data)
        })
	},[router.query.tip])
	
	
	if(upLett.includes(par.toLowerCase())){
		naslov = par.charAt(0).toUpperCase() + par.slice(1)
		naslov = naslov.replace("c","č")
	}else if(par == "delovi"){
		naslov = "Delovi za poljoprivredne mašine"
	}else{
		naslov = "Poljoprivredna mehanizacija"
	}
	function onChange(e){
		var searchR="";
		var searchK="";
		if(e.target.name != "selectsearch"){
			searchR=e.target.value
			searchK=searchKolona
			setSearchValue(searchR)
		}else{
			searchK=e.target.value
			searchR=searchValue

		}
		
		var HOST = process.env.NEXT_PUBLIC_HOST;
		var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
		fetch(PROTOCOL+'://'+HOST+'/api/searchtip?search='+searchR+"&tip="+par+"&searchkolona="+searchK)
        .then(res => res.json())
        .then(data => {
           setProdata(data.results)
        })
	}
	function onChangeSearch(e){
		setSearchKolona(e.target.value)
		onChange(e)
	}
	return (
			<div className={styles.container}>
      
		        <div className={styles.body}>
		            <Link href="/webshop"><h1 className={styles.naslov}>{"<- WEBSHOP"}</h1></Link>
		            
		            <h3 className={styles.naslovmanji}>
		            	{naslov}
		            </h3>
					<Filter styles={styles.filter} change={e => onChange(e)} placeholder="Pretrazi proizvode..."></Filter>
					<select name="selectsearch" value={searchKolona} onChange={e => onChangeSearch(e)}>
						<option value="ime">Ime</option>
						<option value="sifra">Sifra</option>
						<option value="kataloski_broj">Kataloski broj</option>
					</select>
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
