import React from 'react';
import styles from './proizvodi.module.css';
import Korisnici from '../../../components/Admin/Korisnici/index';
import {useState} from 'react'
export async function getServerSideProps({req,res}){
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
    return (
    	<>
    	
        <div className={styles.proizvodi}>
            <div className={styles.heading}>
                <h3>Korisnici</h3>
            </div>
            <Korisnici deletefunc={refreshData} users={users}/>
        </div>
        </>
    );
}

export default proizvodi;