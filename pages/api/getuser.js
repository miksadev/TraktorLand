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
  					res.json({result:"Success",user:results[0]})
  					resolve();
  				}else{
  					res.json({result:'Failed'})
  					resolve();
  				}
  			})
	}else if(req.method == "GET"){
    if(req.query.id != undefined){
            con.query("SELECT * FROM partner WHERE partnerid = ? ",req.query.id,(err,results) => {
          
            res.json({user:results})
            resolve();
          
        })
    }else{
      var offset = req.query.offset;
      con.query("SELECT * FROM partner LIMIT 40 OFFSET "+offset,(err,results) => {
          
            res.json({result:"Success",users:results})
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


