import React from 'react';
import styles from './proizvodi.module.css';
import Korisnici from '../../../components/Admin/Korisnici/index';
import {useState} from 'react'
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


	const users = await fetch(PROTOCOL+'://'+HOST+'/api/getuser').then(res => res.json())
	.then(data => data)
	
	return{
		props:{
			data:users
		}
	}
}
	
const proizvodi = (props) => {
    var HOST = process.env.NEXT_PUBLIC_HOST;
    var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL
	const [users,setUsers] = useState(props.data.users)
	function refreshData(){

		fetch(PROTOCOL+'://'+HOST+'/api/getuser').then(res => res.json())
	.then(data => {
		
		setUsers(data.users)
	})

	}
	function onChange(e){
		fetch(PROTOCOL+'://'+HOST+'/api/searchusers?search='+e.target.value)
		.then(res => res.json())
		.then(data => {
			setUsers(data.results)
		})
	}
    return (
    	<>
    	
        <div className={styles.proizvodi}>
            <div className={styles.heading}>
                <h3>Korisnici</h3>
                <Filter change={e => onChange(e)} placeholder="Pretrazi korisnike..."></Filter>
            </div>
            <Korisnici deletefunc={refreshData} users={users}/>
        </div>
        </>
    );
}

export default proizvodi;