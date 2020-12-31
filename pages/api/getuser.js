import con from '../../store/db.js'
import formidable from 'formidable-serverless';

export default async (req,res) => {
	return new Promise(resolve => {
    if(req.method == "POST"){
		res.sendStatus = 200
		res.setHeader('Content-Type', 'application/json')
		var email = JSON.parse(req.body).email
  			con.query("SELECT * FROM partner WHERE email = ?",[email],(err,results) => {
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
	}else if(req.method == "GET"){
    if(req.query.id != undefined){
            con.query("SELECT * FROM partner WHERE partnerid = ? ",req.query.id,(err,results) => {
          
            res.send(JSON.stringify({user:results}))
            res.end()
            resolve();
          
        })
    }else{
      var offset = req.query.offset;
      con.query("SELECT * FROM partner LIMIT 40 OFFSET "+offset,(err,results) => {
          
            res.send(JSON.stringify({result:"Success",users:results}))
            res.end()
            resolve();
          
        })
    }
  }else{
		 res.redirect('/')
    	 res.end();
    	 resolve()
	}
})
}


