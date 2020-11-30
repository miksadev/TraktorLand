import con from '../../store/db.js'
import formidable from 'formidable-serverless';

export default async (req,res) => {
	return new Promise(resolve => {
    if(req.query.search != undefined){
      var search = req.query.search
      var tip = ""
      if(req.query.tip == "novi"){
      	tip = 0;
      }else{
      	tip = 1;
      }
    con.query("SELECT * FROM document WHERE ime_prezime LIKE ? AND zavrsen = ? ORDER BY ime_prezime ASC",["%"+search+"%",tip],(err,results) => {
          
            res.send(JSON.stringify({results}))
            res.end()
            resolve();
          
        })
  }
})
}