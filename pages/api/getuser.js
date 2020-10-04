import con from '../../store/db.js'
import formidable from 'formidable-serverless';

export default async (req,res) => {
	return new Promise(resolve => {
    if(req.method == "POST"){
		res.sendStatus = 200
		res.setHeader('Content-Type', 'application/json')
		var email = JSON.parse(req.body).email
  			con.query("SELECT * FROM users WHERE email = ?",[email],(err,results) => {
  				if(results.length > 0){
  					res.send(JSON.stringify({result:"Success",user:results[0]}))
  					res.end()
  					resolve();
  				}else{
  					res.send(JSON.stringify({result:'Failed'}))
  					res.end()
  					resolve();
  				}
  			})
	}else{
		 res.redirect('/')
    	 res.end();
    	 resolve()
	}
})
}


