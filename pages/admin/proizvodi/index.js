import React from 'react';
import styles from './proizvodi.module.css';
import Proizvodi from '../../../components/Admin/Proizvodi/proizvodi';
import Link from 'next/link';
import {useState,useEffect,useRef} from 'react';
import Cookies from 'cookies';
import Filter from '../../../components/Search/Filter/filter';
export async function getServerSideProps({req,res}){
 var HOST = process.env.HOST;
        var PROTOCOL = process.env.PROTOCOL
	    var user = ""
        var email = ""
        var cookies = new Cookies(req,res)
        var authToken = cookies.get('auth-token')
        var offset = 0;
        if(authToken == undefined){
            res.writeHead(307,{Location:'/login'})
             res.end();
        }
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
        	if(user.partnertype !== "admin"){
        		res.writeHead(307,{Location:'/login'})
             res.end();
        	}

	//----------------------------------------------------


	const data = await  fetch(PROTOCOL+'://'+HOST+'/api/get?offset='+offset).then(res => res.json()).then(data => data)
	return{
		props:{
			data:data
		}
	}
}


var loading = false;
var search4code = ""
var sub4code = ""
var kolona4code = ""
var offset = 0;
var disScroll = false;
var lastScroll = 0;
const proizvodi = (props) => {
	const [pro,setPro] = useState(props.data)
    const [searchKolona,setSearchKolona] = useState("name")
    const [searchValue,setSearchValue] = useState("");
    const testRef = useRef();
    var HOST = process.env.NEXT_PUBLIC_HOST;
    var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL
    useEffect(()=>{
        search4code = searchValue

    },[searchValue])
    useEffect(()=>{
        kolona4code = searchKolona

    },[searchKolona])
    
    useEffect(()=>{
        window.addEventListener("scroll",scrollFunc)
        return ()=>{

            window.removeEventListener("scroll",scrollFunc)

        }
    },[])
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
        if(window.scrollY > (scrollMaxY-20)){

            if(!loading){
                if(search4code != "" || sub4code != ""){
                    offset +=40
                    loading = true
                    fetch(PROTOCOL+'://'+HOST+'/api/searchpro?search='+search4code+"&searchkolona="+kolona4code+"&offset="+offset)
                    .then(res => res.json())
                    .then(data => {
                        if(data.length == 0){
                            disScroll = true
                        }
                       setPro(prevData => prevData.concat(data.results))
                       setTimeout(()=>{
                        loading = false
                        },1000)
                    })
                }else{
                    offset +=40
                loading = true
                fetch(PROTOCOL +'://'+HOST+'/api/get?offset='+offset).then(res => res.json())
                .then(data => {
                    if(data.length == 0){
                        disScroll = true
                    }
                    setPro(prevData => prevData.concat(data))
                    setTimeout(()=>{
                        loading = false
                    },1000)
                    
                })
                }
            
            }
        }
        
        lastScroll = window.scrollY
    }
	function onChange(e){
       
        offset = 0;
        disScroll = false;
        lastScroll = 0;
        var searchR=""
        var searchK=""
        if(e.target.name != "selectsearch"){
            searchR=e.target.value
            searchK=searchKolona
            setSearchValue(searchR)
        }else{
            searchK=e.target.value
            searchR=searchValue

        }
		fetch(PROTOCOL+'://'+HOST+'/api/searchpro?search='+searchR+"&searchkolona="+searchK+"&offset="+offset).
		then(res => res.json()).then(data => {

			setPro(data.results)

		})

	}
    function onChangeSearch(e){
        setSearchKolona(e.target.value)
        onChange(e)
    }
    return (
        <div className={styles.proizvodii}>
            <div className={styles.headingg}>
                <h3>Proizvodi </h3> 
                <Filter change={e => onChange(e)} placeholder="Pretrazi proizvode..."></Filter>
                <select className={styles.selectt} style={{marginLeft:"300px"}} name="selectsearch" value={searchKolona} onChange={e => onChangeSearch(e)}>
                        <option value="name">Ime</option>
                        <option value="code">Sifra</option>
                        <option value="kataloski_broj">Kataloski broj</option>
                    </select>
            </div>
            <div ref={testRef}>
                <Proizvodi data={pro}/>
            </div>
        </div>
    );
}

export default proizvodi;