import con from '../../store/db.js'


export default async (req,res) => {
  
  return new Promise(resolve => {
    res.statusCode = 200
  res.setHeader('Content-Type','application/json')
  
    con.query("SELECT * FROM orders",function(err,result,fields){
      if(err) throw err;
      res.send(JSON.stringify(result))
      res.end()
      resolve()
    })
  
  
  })
  
}