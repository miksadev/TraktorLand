import con from '../../store/db.js'
import formidable from 'formidable-serverless';

export default async (req,res) => {
	return new Promise(resolve => {
    if(req.query.search != undefined){
      var search = req.query.search
    con.query("SELECT * FROM proizvodi WHERE ime LIKE ? ORDER BY ime ASC","%"+search+"%",(err,results) => {
          
            res.send(JSON.stringify({results}))
            res.end()
            resolve();
          
        })
  }
})
}
