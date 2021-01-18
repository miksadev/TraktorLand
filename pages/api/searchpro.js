import con from '../../store/db.js'
import formidable from 'formidable-serverless';

export default async (req,res) => {
	return new Promise(resolve => {
    if(req.query.search != undefined){
      var offset = req.query.offset
      var search = req.query.search
      var kolona = req.query.searchkolona
    con.query("SELECT * FROM product WHERE "+kolona+" LIKE ? ORDER BY name ASC LIMIT 8 OFFSET "+offset,["%"+search+"%"],(err,results) => {
          
            res.json({results})
            resolve();
          
        })
  }
})
}
