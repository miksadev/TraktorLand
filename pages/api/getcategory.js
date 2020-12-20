import con from '../../store/db.js'
import formidable from 'formidable-serverless';

export default async (req,res) => {
	return new Promise(resolve => {
    if(req.query.id != undefined){
      var id = req.query.id
    con.query("SELECT * FROM categorypr WHERE id = ?",id,(err,results) => {
            
            res.send(JSON.stringify({data:results[0]}))
            res.end()
            resolve();
          
        })
  }else if(req.query.productid != undefined){
      var id = req.query.productid
    con.query("SELECT * FROM productcategorypr WHERE productid = ?",id,(err,results) => {
            
            res.send(JSON.stringify({data:results}))
            res.end()
            resolve();
          
        })
  }else{
    con.query("SELECT * FROM categorypr ",(err,results) => {
          
            res.send(JSON.stringify({data:results}))
            res.end()
            resolve();
          
        })
  }
})
}


