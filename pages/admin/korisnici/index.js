import React from 'react';
import styles from './proizvodi.module.css';
import Korisnici from '../../../components/Admin/Korisnici/index';
import {useState} from 'react'
import Cookies from 'cookies';
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


	const users = await fetch('http://localhost:3000/api/getuser').then(res => res.json())
	.then(data => data)
	
	return{
		props:{
			data:users
		}
	}
}
	
const proizvodi = (props) => {
	const [users,setUsers] = useState(props.data.users)
	function refreshData(){
		fetch('http://localhost:3000/api/getuser').then(res => res.json())
	.then(data => {
		
		setUsers(data.users)
	})

	}
	function onChange(e){
		fetch('http://localhost:3000/api/searchusers?search='+e.target.value)
		.then(res => res.json())
		.then(data => {
			setUsers(data.results)
		})
	}
    return (
    	<>
    	
        <div className={styles.proizvodi}>
            <div className={styles.heading}>
                <h3>Korisnici</h3><input type="text" onChange={e => onChange(e)} style={{position:"absolute",marginTop:"36px",marginLeft:"40px"}} placeholder="Pretrazi korisnike..." />
            </div>
            <Korisnici deletefunc={refreshData} users={users}/>
        </div>
        </>
    );
}

export default proizvodi;