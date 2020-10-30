import React from 'react';
import styles from './proizvodi.module.css';
import Proizvodi from '../../../components/Admin/Proizvodi/proizvodi';
import Link from 'next/link';
import {useState} from 'react';
import Cookies from 'cookies';
import Filter from '../../../components/Search/Filter/filter';
export async function getServerSideProps({req,res}){
 var HOST = process.env.HOST;
        var PROTOCOL = process.env.PROTOCOL
	var user = ""
        var email = ""
        var cookies = new Cookies(req,res)
        var authToken = cookies.get('auth-token')
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
        	if(user.rank !== "admin"){
        		res.writeHead(307,{Location:'/login'})
             res.end();
        	}

	//----------------------------------------------------


	const data = await  fetch(PROTOCOL+'://'+HOST+'/api/get').then(res => res.json()).then(data => data)
	return{
		props:{
			data:data
		}
	}
}

const proizvodi = (props) => {
	const [pro,setPro] = useState(props.data)
    var HOST = process.env.NEXT_PUBLIC_HOST;
    var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL
	function onChange(e){
		fetch(PROTOCOL+'://'+HOST+'/api/searchpro?search='+e.target.value).
		then(res => res.json()).then(data => {

			setPro(data.results)

		})

	}
    return (
        <div className={styles.proizvodii}>
            <div className={styles.headingg}>
                <h3>Proizvodi </h3> 
                <Filter change={e => onChange(e)} placeholder="Pretrazi proizvode..."></Filter>

            </div>
            <Proizvodi data={pro}/>
            <Link href="/admin/proizvodi/add"><img className={styles.add} src="/admin/add.png" alt=""/></Link>
        </div>
    );
}

export default proizvodi;