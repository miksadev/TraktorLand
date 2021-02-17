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
    if(req.query.search != undefined){
      var search = req.query.search
    con.query("SELECT * FROM akcije WHERE ime LIKE ? ORDER BY ime ASC","%"+search+"%",(err,results) => {
          
            res.json({results})
            resolve();
          
        })
    con.end();
  }
})
}