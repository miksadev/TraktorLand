import con from '../../store/db.js'
import formidable from 'formidable-serverless';

export default async (req,res) => {
	return new Promise(resolve => {
    if(req.query.search != undefined && req.query.tip == undefined){
      var search = req.query.search
    con.query("SELECT * FROM product WHERE name LIKE ? ORDER BY name ASC LIMIT 10",search+"%",(err,results) => {
          
            res.send(JSON.stringify({results}))
            res.end()
            resolve();
        })
  }else if(req.query.search != undefined && req.query.tip != undefined){
    var search = req.query.search
    var tip = req.query.tip
    con.query("SELECT * FROM product WHERE name LIKE ? AND type = ? ORDER BY name ASC LIMIT 10",[search+"%",tip],(err,results) => {
          
            res.send(JSON.stringify({results}))
            res.end()
            resolve();
          
        })
  }
})
}
