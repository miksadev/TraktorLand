import React from 'react';
import styles from '../proizvodi/proizvodi.module.css';
import Akcija from '../../../components/Admin/Akcije/akcije';
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





	const data = await fetch("http://localhost:3000/api/getakcije")
	.then(res => res.json()).then(data => data)
	return{
		props:{
			akcije:data.data
		}
	}
}

const proizvodi = ({akcije}) => {
	const [dataAkcije,setDataAkcije] = useState(akcije)
	function refreshData(){
		fetch("http://localhost:3000/api/getakcije")
	.then(res => res.json()).then(data => {
		setDataAkcije(data.data)
	})
	}
	function onChange(e){
		fetch('http://localhost:3000/api/searchakcije?search='+e.target.value)
		.then(res => res.json())
		.then(data => {
			setDataAkcije(data.results)
		})
	}
    return (
        <div className={styles.proizvodi}>
            <div className={styles.heading}>
                <h3>Proizvodi na akciji</h3>
                <Filter change={e => onChange(e)} placeholder="Pretrazi akcije..."></Filter>
            </div>
            <Akcija akcije={dataAkcije} refreshfunc={refreshData}/>
            <Link href="/admin/akcija/add"><img className={styles.add} src="/admin/add.png" alt=""/></Link>
        </div>
    );
}

export default proizvodi;