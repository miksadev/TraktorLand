import con from '../../store/db.js'
import formidable from 'formidable-serverless';

export default async (req,res) => {
	return new Promise(resolve => {
    if(req.query.search != undefined){
      var search = req.query.search
    con.query("SELECT * FROM users WHERE ime LIKE ? OR prezime LIKE ? ORDER BY ime ASC",["%"+search+"%","%"+search+"%"],(err,results) => {
          
            res.send(JSON.stringify({results}))
            res.end()
            resolve();
          
        })
  }
})
}