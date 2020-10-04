import Cookies from 'cookies'
import jwt from 'jsonwebtoken';

export default async (req,res) => {
	return new Promise(resolve => {
		res.sendStatus = 200
	res.setHeader('Content-Type', 'application/json')
	const authToken = req.headers['auth-token']
	
	jwt.verify(authToken,'traktorlandsecret',function(err,decoded){
		if(err){
			res.end(JSON.stringify({result:'Failed'}))
			resolve()
		}else{
			res.end(JSON.stringify({result:'Success',email:decoded.username}))
			resolve()
		}
	})
	})
	
}