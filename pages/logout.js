import Cookies from 'cookies'
export async function getServerSideProps({req,res}){
		var cookies = new Cookies(req,res)
		cookies.set('auth-token')
		res.writeHead(307,{Location:'/'})
		res.end();
		return{
			props:{
				data:"fake"
			}
		}
}
export default function Logout(){
	return;
}