import mysql from 'mysql'
import formidable from 'formidable-serverless';

export default async (req,res) => {
	return new Promise(resolve => {
    const con = mysql.createConnection({
 host:'5.57.72.163',
  user:'sajt',
  password:'1',
  database:'gazzele_web',
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000
});
    if(req.query.id != undefined){
      var id = req.query.id
    con.query("SELECT * FROM akcija WHERE id = ?",id,(err,results) => {
            var res;
            if(results.length != 0){
              res = results[0]
            }else{
              res = []
            }
            res.json({data:res})
           
            res.end()
            resolve();
          
        })
    con.end();
  }else{
    con.query("SELECT * FROM akcija ",(err,results) => {
            res.json({data:results})
          
            resolve();
          
        })
     con.end();
  }
})
}


