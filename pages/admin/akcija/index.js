import React from 'react';
import styles from '../proizvodi/proizvodi.module.css';
import Akcija from '../../../components/Admin/Akcije/akcije';
import Link from 'next/link';
import {useState} from 'react';
export async function getServerSideProps({req,res}){
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
    return (
        <div className={styles.proizvodi}>
            <div className={styles.heading}>
                <h3>Proizvodi na akciji</h3>
            </div>
            <Akcija akcije={dataAkcije} refreshfunc={refreshData}/>
            <Link href="/admin/akcija/add"><img className={styles.add} src="/admin/add.png" alt=""/></Link>
        </div>
    );
}

export default proizvodi;