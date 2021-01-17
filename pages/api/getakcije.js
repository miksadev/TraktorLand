import con from '../../store/db.js'
import formidable from 'formidable-serverless';

export default async (req,res) => {
	return new Promise(resolve => {
    if(req.query.id != undefined){
      var id = req.query.id
    con.query("SELECT * FROM akcija WHERE id = ?",id,(err,results) => {
            var res;
            if(results.length != 0){
              res = results[0]
            }else{
              res = []
            }
            res.send(JSON.stringify({data:res}))
            res.end()
            resolve();
          
        })
  }else{
    con.query("SELECT * FROM akcija ",(err,results) => {
          
            res.send(JSON.stringify({data:results}))
            res.end()
            resolve();
          
        })
  }
})
}


