import con from '../../store/db.js'
import formidable from 'formidable-serverless';

export default async (req,res) => {
	return new Promise(resolve => {
    if(req.query.search != undefined){
      var search = req.query.search
      var kolona = req.query.searchkolona
    con.query("SELECT * FROM proizvodi WHERE "+kolona+" LIKE ? ORDER BY ime ASC",search+"%",(err,results) => {
          
            res.send(JSON.stringify({results}))
            res.end()
            resolve();
          
        })
  }
})
}
