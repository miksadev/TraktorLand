import React from 'react';
import styles from './proizvodi.module.css';
import Orderi from '../../../components/Admin/Orderi/orderi';

export async function getServerSideProps(){
    const data = await fetch('http://localhost:3000/api/getorders').then(res => res.json())
    .then(data => data)
    return {
        props:{
            data:data
        }
    }
}
const proizvodi = ({data}) => {
    return (
        <div className={styles.proizvodi}>
            <div className={styles.heading}>
                <h3>Orderi</h3>
                <button className={styles.novi}>Novi</button>
                <button className={styles.zavrseni}>Zavrseni</button>
            </div>
            <Orderi orders={data}/>
        </div>
    );
}

export default proizvodi;