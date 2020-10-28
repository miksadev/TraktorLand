import React from 'react';
import styles from './proizvodi.module.css';
import Proizvodi from '../../../components/Admin/Proizvodi/proizvodi';
import Link from 'next/link';
import {useState} from 'react';
import Cookies from 'cookies';
import Filter from '../../../components/Search/Filter/filter';
export async function getServerSideProps({req,res}){

	var user = ""
        var email = ""
        var cookies = new Cookies(req,res)
        var authToken = cookies.get('auth-token')
        if(authToken == undefined){
            res.writeHead(307,{Location:'/login'})
             res.end();
        }
        await fetch('http://localhost:3000/api/checkauth',
            {headers:{'auth-token':authToken}}).then(res => res.json())
        .then(data => {
           email = data.email
        })

        await fetch('http://localhost:3000/api/getuser',{
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


	const data = await  fetch('http://localhost:3000/api/get').then(res => res.json()).then(data => data)
	return{
		props:{
			data:data
		}
	}
}

const proizvodi = (props) => {
	const [pro,setPro] = useState(props.data)
	function onChange(e){
		fetch('http://localhost:3000/api/searchpro?search='+e.target.value).
		then(res => res.json()).then(data => {

			setPro(data.results)

		})

	}
    return (
        <div className={styles.proizvodi}>
            <div className={styles.heading}>
                <h3>Proizvodi </h3> 
                <Filter change={e => onChange(e)} placeholder="Pretrazi proizvode..."></Filter>

            </div>
            <Proizvodi data={pro}/>
            <Link href="/admin/proizvodi/add"><img className={styles.add} src="/admin/add.png" alt=""/></Link>
        </div>
    );
}

export default proizvodi;