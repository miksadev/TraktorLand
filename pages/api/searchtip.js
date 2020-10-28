import con from '../../store/db.js'
import formidable from 'formidable-serverless';

export default async (req,res) => {
	return new Promise(resolve => {
    if(req.query.search != undefined && req.query.tip != undefined){
      var search = req.query.search
      var tip = req.query.tip
    con.query("SELECT * FROM proizvodi WHERE ime LIKE ? AND tip = ? ORDER BY ime ASC",["%"+search+"%",tip],(err,results) => {
          
            res.send(JSON.stringify({results}))
            res.end()
            resolve();
          
        })
  }
})
}