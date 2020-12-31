import con from '../../store/db.js'
import formidable from 'formidable-serverless';

export default async (req,res) => {
	return new Promise(resolve => {
    if(req.query.search != undefined){
      var search = req.query.search
      var offset = req.query.offset
    con.query("SELECT * FROM partner WHERE name LIKE ? ORDER BY name ASC LIMIT 40 OFFSET "+offset,["%"+search+"%"],(err,results) => {
          
            res.send(JSON.stringify({results}))
            res.end()
            resolve();
          
        })
  }
})
}