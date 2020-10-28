import {useRouter} from 'next/router'
import Order from '../../../components/Order/order';
import styles from '../../../styles/checkout.module.css';
import qs from 'querystring';
import Cookies from 'cookies';
export async function getServerSideProps({req,res,query}){

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



	var id = query.id
	var data = await fetch('http://localhost:3000/api/getorders?id='+id).then(res => res.json())
	.then(data => data);
	var orders = await fetch('http://localhost:3000/api/getorders?order_id='+id).then(res => res.json())
	.then(data => data)
	
	return{
		props:{
			data:data[0],
			orders:orders
		}
	}
}
const ViewOrder = ({data,orders}) => {
	const router = useRouter()
	const {id} = router.query

	return(
		<div className={styles.container}>

        <div className={styles.body}>

            <h1 className={styles.naslov}>Pregled porudzbine</h1>
            <span style={{marginLeft:'60px',cursor:'pointer'}} onClick={() => router.back()}>{'<'} ADMIN</span>

            <div className={styles.line}></div>
            <Order namena="checkout" orders={orders} data={data} edit={false}/>
            
            
        </div>
       

    </div>
	)
}

export default ViewOrder;