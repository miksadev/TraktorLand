import con from '../../store/db.js'
import formidable from 'formidable-serverless';

export default async (req,res) => {
	return new Promise(resolve => {
    if(req.query.id != undefined){
      var id = req.query.id
    con.query("SELECT * FROM akcije WHERE id = ?",id,(err,results) => {
          
            res.send(JSON.stringify({data:results[0]}))
            res.end()
            resolve();
          
        })
  }else{
    con.query("SELECT * FROM akcije ",(err,results) => {
          
            res.send(JSON.stringify({data:results}))
            res.end()
            resolve();
          
        })
  }
})
}


