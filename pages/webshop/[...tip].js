import { useRouter} from 'next/router'
import { useRef } from 'react'
import Link from 'next/link'
import styles from "../../styles/webshop.module.css";
import Products from '../../components/products/products';
import {useState,useEffect} from 'react';
import Filter from '../../components/Search/Filter/filter';
import Cookies from 'cookies'

var search4code = ""
var sub4code = ""
var kolona4code = ""
var offset = 0;
var disScroll = false;
var lastScroll = 0;

function Webshop(props){
	
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
		if(kolona4code != ""){
        	setProdata(props.data)
        	setSearchValue("")
		}
	},[par])
	useEffect(()=>{
		setSubCategory(props.sub)
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
		var scrollTrig = offsetHeight-offsetTop;
		
		if (window.scrollY < lastScroll) {
    		return;
		}
	
		if(disScroll){
			return;
		}
	
		var scrollMaxY = window.scrollMaxY || (document.documentElement.scrollHeight - document.documentElement.clientHeight)
		var HOST = process.env.NEXT_PUBLIC_HOST;
		var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
		
		if(window.scrollY > scrollTrig){
			if(!loading){
				if(search4code != "" || sub4code != ""){
					offset +=40
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
					offset +=40
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
		// console.log("TIIP")
		// console.log(par)
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
        	console.log("DADADADA")
        	console.log(data.results.length)
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
					{subCategory.map(item => <option value={item.categoryprid}>{item.name}</option>)}
					</select>
		            <div className={styles.line}></div>
		            
		           <div ref={testRef}>
		           <Products  type={props.type} user={props.user} backroute={props.param} data={prodata} mdata={props.mData}/>

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
	var data = await fetch(PROTOCOL +'://'+HOST+'/api/get?tip='+param+'&offset='+offset).
	then(res => res.json()).then(data =>data)
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
