import { useRouter} from 'next/router'
import { useRef } from 'react'
import Link from 'next/link'
import styles from "../../styles/webshop.module.css";
import Products from '../../components/products/products';
import {useState,useEffect} from 'react';
import Filter from '../../components/Search/Filter/filter';
import Loading from '../../components/UI/Loading/loading';
import Cookies from 'cookies'

var search4code = ""
var sub4code = ""
var kolona4code = ""
var offset = 0;
var disScroll = true;
var lastScroll = 0;
var moveTo = 0;
function Webshop(props){
	var HOST = process.env.NEXT_PUBLIC_HOST;
		var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
	const testRef = useRef();
	const [prodata,setProdata] = useState(props.data)
	const [subCategory,setSubCategory] = useState(props.sub)
	const [searchKolona,setSearchKolona] = useState("name")
	const [searchSubCategory,setSearchSubCategory] = useState("")
	const [searchValue,setSearchValue] = useState("");
	const [position,setPosition] = useState();

	const router = useRouter()
  	const tip = router.query.tip
  	
  
	var upLett = ["traktori","beraci","freze","kombajni","ostalo"];
    var loading = false;
	var par = props.param


	var naslov = ""
	useEffect(()=>{

		fetch(PROTOCOL +'://'+HOST+'/api/get?tip='+props.type+'&offset='+'0').then(res => res.json())
				.then(data => {
					disScroll = false;
					setProdata(data)
				})
	},[])
	useEffect(()=>{
		if(kolona4code != ""){
        	fetch(PROTOCOL +'://'+HOST+'/api/get?tip='+props.type+'&offset='+'0').then(res => res.json())
				.then(data => setProdata(data))
        	setSearchValue("")
		}
	},[par])
	useEffect(()=>{
		setSubCategory(props.sub)
		if(router.query.tip[1] == undefined){
			window.scrollTo(0,moveTo)
		}
	},[props.sub])
	
	useEffect(()=>{

		search4code = searchValue

	},[searchValue])
	useEffect(()=>{
		kolona4code = searchKolona

	},[searchKolona])
	useEffect(()=>{
		sub4code = searchSubCategory
	},[searchSubCategory])
	function scrollFunc(event){
		
		var {offsetTop,offsetHeight} = testRef.current
		var scrollTrig = offsetHeight-offsetTop-100;
		
		if (window.scrollY < lastScroll) {
    		return;
		}
	
		if(disScroll){
			return;
		}
		
		var scrollMaxY = window.scrollMaxY || (document.documentElement.scrollHeight - document.documentElement.clientHeight)
		
		
		if(window.scrollY > scrollTrig){
			if(!loading){
				if(search4code != "" || sub4code != ""){
					offset +=20
					loading = true
					fetch(PROTOCOL+'://'+HOST+'/api/searchtip?search='+search4code+"&tip="+par+"&searchkolona="+kolona4code+"&sub="+sub4code+"&offset="+offset)
			        .then(res => res.json())
			        .then(data => {
			        	
			        	if(data.results.length == 0){
							disScroll = true
						}
			           setProdata(prevData => prevData.concat(data.results))
			           setTimeout(()=>{
						loading = false
						},1000)
			        })
				}else{
					offset +=20
				loading = true
				fetch(PROTOCOL +'://'+HOST+'/api/get?tip='+props.type+'&offset='+offset).then(res => res.json())
				.then(data => {
					if(data.length == 0){
						disScroll = true
					}
					setProdata(prevData => prevData.concat(data))
					setTimeout(()=>{
						loading = false
					},1000)
					
				})
				}
			
			}
		}
		lastScroll = window.scrollY
	}
	
	useEffect(() => {

		window.addEventListener("scroll",scrollFunc)
		// var HOST = process.env.NEXT_PUBLIC_HOST;
		// var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
		// var offset = 0
		
		// 	offset = 0;
		// 	var HOST = process.env.NEXT_PUBLIC_HOST;
		// var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
		// fetch(PROTOCOL+'://'+HOST+'/api/searchtip?search='+search4code+"&tip="+par+"&searchkolona="+kolona4code+"&sub="+sub4code+"&offset="+offset)
  //       .then(res => res.json())
  //       .then(data => {
  //       	setProdata(data.results)
  //          console.log("PREVVVV")
  //          setProdata(prevData => {
  //          	console.log(prevData)
  //          	return data.results
  //          })
  //       })
		
        return ()=>{
		if(lastScroll != 0){
        		moveTo = lastScroll
        	}
        	lastScroll = 0;
        	window.removeEventListener("scroll",scrollFunc)

        }
	},[router.query.tip])
	
	
	if(upLett.includes(par.toLowerCase())){
		naslov = par.charAt(0).toUpperCase() + par.slice(1)
		naslov = naslov.replace("c","č")
	}else if(par == "delovi"){
		naslov = "Delovi za poljoprivredne mašine"
	}else{
		naslov = "Poljoprivredna mehanizacija"
	}
	function onChange(e,sub){
		offset =0;
        	disScroll = false;
		lastScroll = 0;
			if(sub == "" || sub == undefined){
			sub = searchSubCategory

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
		}else if (sub == "off"){
			sub = ""
			setSearchSubCategory("")
			searchK=searchKolona
			searchR=searchValue
		}else{
			
			searchK=searchKolona
			searchR=searchValue
		}
		var HOST = process.env.NEXT_PUBLIC_HOST;
		var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
		fetch(PROTOCOL+'://'+HOST+'/api/searchtip?search='+searchR+"&tip="+par+"&searchkolona="+searchK+"&sub="+sub+"&offset="+offset)
        .then(res => res.json())
        .then(data => {
        	setProdata([])
           setProdata(data.results)
        })
		
		
	}
	function onChangeSearch(e){
		setSearchKolona(e.target.value)
		onChange(e,"")
	}
	function onChangeSearchSub(e){
		setSearchSubCategory(e.target.value)
		onChange(e,e.target.value)
	}
	useEffect(()=> {
		// console.log(prodata);
	},[prodata])

	return (
			<div className={styles.container} >
      
		        <div className={styles.body} >
		            <Link href="/webshop"><h1 className={styles.naslov}>{"<- WEBSHOP"}</h1></Link>
		            
		            <h3 className={styles.naslovmanji}>
		            	{naslov}
		            </h3>
					<Filter val={searchValue} styles={styles.filter} change={e => onChange(e)} placeholder="Pretrazi proizvode..."></Filter>
					<select className={styles.selectt} name="selectsearch" value={searchKolona} onChange={e => onChangeSearch(e)}>
						<option value="name">Ime</option>
						<option value="code">Sifra</option>
						<option value="kataloski_broj">Kataloski broj</option>
					</select>
					<select className={styles.selectt} name="selectsearchsub" value={searchSubCategory} onChange={e => onChangeSearchSub(e)}>
						<option value="off">{"Sve podkategorije"}</option>
					{subCategory.map(item => <option key={item.categoryprid} value={item.categoryprid}>{item.name}</option>)}
					</select>
		            <div className={styles.line}></div>
		            
		           <div ref={testRef}>
					
					{prodata.length != 0  ? <Products  type={props.type} user={props.user} backroute={props.param} data={prodata} mdata={props.mData}/> : <Loading message="Ucitavanje proizvoda"/>}
		           

		           </div>
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
	var offset = 0;
	var data = []
	var sub = await fetch(PROTOCOL +'://'+HOST+`/api/getsubcategory?name=`+param).
	then(res => res.json()).then(data =>data)




	var user = ""
        var email = ""
        var cookies = new Cookies(context.req,context.res)
        var authToken = cookies.get('auth-token')
        if(authToken != undefined){
            
        
        await fetch(PROTOCOL+'://'+HOST+'/api/checkauth',
            {headers:{'auth-token':authToken}}).then(res => res.json())
        .then(data => {
           email = data.email
        })

        await fetch(PROTOCOL+'://'+HOST+'/api/getuser',{
                method:'POST',
                body:JSON.stringify({email:email})
            }).then(res => res.json()).then(data => {
                user = data.user
            })
        }






	return{
		props:{
			data,
			mData,
			param:backroute,
			user:user,
			type:param,
			sub:sub
		}
	}
	
}
export default Webshop
