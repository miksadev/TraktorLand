import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from "../../styles/webshop.module.css";
import Products from '../../components/products/products';
import Cookies from 'cookies'

function Search(props){
	const router = useRouter()
	var naslov = ""
	return (
			<div className={styles.container}>
      
		        <div className={styles.body}>
		            <Link href="/webshop"><h1 className={styles.naslov}>{"<- WEBSHOP"}</h1></Link>
		            <h3 className={styles.naslovmanji}>
		            	{naslov}

		            </h3>
		            <div className={styles.line}></div>
		            <Products user={props.user} search={props.search} backroute={props.param} data={props.data} mdata={props.mData}/>
		        </div>
		      
		    </div>
		)
}
export async function getServerSideProps(context){
	var HOST = process.env.HOST;
     var PROTOCOL = process.env.PROTOCOL
	var data = await fetch(PROTOCOL+"://"+HOST+"/api/search?search="+context.query.search)
	.then(res => res.json()).then(data => data.results)
	var email = ""
	var online = true;

	var cookies = new Cookies(context.req,context.res)
        var authToken = cookies.get('auth-token')
        if(authToken == undefined){
            online = false
        }
        if(online){
        	await fetch(PROTOCOL+'://'+HOST+'/api/checkauth',
            {headers:{'auth-token':authToken}}).then(res => res.json())
        .then(data => {
           email = data.email
        })
	var user =  await fetch(PROTOCOL+'://'+HOST+'/api/getuser',{
                method:'POST',
                body:JSON.stringify({email:email})
            }).then(res => res.json()).then(data => data.user)
        }else{
        	var user = {}
        }
        
	return{
		props:{
			data:data,
			mData:"empty",
			param:context.query.search,
			search:"true",
			user:user
		}
	}
	
}
export default Search