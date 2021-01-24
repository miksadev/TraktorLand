import con from '../../store/db.js'
import formidable from 'formidable-serverless';

export default async (req,res) => {
	return new Promise(resolve => {
    if(req.query.id != undefined){
      var id = req.query.id
    con.query("SELECT * FROM akcija WHERE id = ?",id,(err,results) => {
            var result;
            if(results.length != 0){
              result = results[0]
            }else{
              result = []
            }
            res.json({data:result})
           
            res.end()
            resolve();
          
        })
  }else{
    con.query("SELECT * FROM akcija ",(err,results) => {
            res.json({data:results})
          
            resolve();
          
        })
  }
})
}


