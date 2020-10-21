import React from 'react';
import Order from '../../../components/Order/order';
import styles from '../../../styles/checkout.module.css';
import qs from 'querystring';
const order = ({data}) => {
    return (
        <div className={styles.container}>

        <div className={styles.body}>
            <h1 className={styles.naslov}>Pregled porudzbine</h1>
            <div className={styles.line}></div>
            <Order namena="checkout" data={data} edit={false}/>
            
            
        </div>
       

    </div>
       
    );
}
export async function getServerSideProps({req,res}){
	var data = {};
	const streamPromise = new Promise((resolve,reject) => {
		let postBody = '';
		req.on('data',(data) => {
			postBody+=data.toString()
		})
		req.on('end', () => {
			const postData = qs.parse(postBody)
			resolve(postData)
		})
	})
	try{
		data = await streamPromise
		if(Object.keys(data).length == 0){
		 	res.writeHead(302,{
		 		'Location':'/'
		 	})
		 	res.end();
		}

	}catch(err){
		console.log("StreamPromiseError")
		console.log(err)
	}

	return {
		props:{
			data:data

		}
	}
}
export default order;