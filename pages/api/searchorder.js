import con from '../../store/db.js'
import formidable from 'formidable-serverless';

export default async (req,res) => {
	return new Promise(resolve => {
    if(req.query.search != undefined){
      var search = req.query.search
      var offset = req.query.offset
      var tip = ""
      if(req.query.tip == "novi"){
      	tip = 0;
      }else{
      	tip = 1;
      }
    con.query("SELECT * FROM document WHERE ime_prezime LIKE ? AND zavrsen = ? ORDER BY ime_prezime ASC LIMIT 40 OFFSET "+offset,["%"+search+"%",tip],(err,results) => {
          
            res.json({results})
            resolve();
          
        })
  }
})
}