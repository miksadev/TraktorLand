import con from '../../store/db.js'
import formidable from 'formidable-serverless';

export default async (req,res) => {
	return new Promise(resolve => {
    if(req.query.search != undefined && req.query.tip != undefined){
      var search = req.query.search
      var tip = req.query.tip
      var kolona = req.query.searchkolona
      var search_start;
      if(kolona == "ime"){
        search_start=search+"%"
      }else{
        search_start=search+"%"
      }
    con.query("SELECT * FROM proizvodi WHERE "+kolona+" LIKE ? AND tip = ? ORDER BY ime ASC",[search_start,tip],(err,results) => {
          
            res.send(JSON.stringify({results}))
            res.end()
            resolve();
          
        })
  }
})
}