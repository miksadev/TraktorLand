import con from '../../store/db.js'


export default async (req,res) => {
  
  return new Promise(resolve => {
    res.statusCode = 200
  res.setHeader('Content-Type','application/json')
  if(req.query.id != undefined){
      var id = req.query.id
      con.query("SELECT * FROM partneraddress WHERE foreign_partneraddressid_web = ?",id,function(err,result,fields){
      if(err) throw err;
      res.json(result)
      resolve()
    })
  }
    
  
  
  })
  
}