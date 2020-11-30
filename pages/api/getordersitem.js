import con from '../../store/db.js'


export default async (req,res) => {
  
  return new Promise(resolve => {
    res.statusCode = 200
  res.setHeader('Content-Type','application/json')
  if(req.query.id != undefined){
      var id = req.query.id
      con.query("SELECT * FROM documentitem WHERE documentid = ?",id,function(err,result,fields){
      if(err) throw err;
      res.send(JSON.stringify(result))
      res.end()
      resolve()
    })
  }
    
  
  
  })
  
}