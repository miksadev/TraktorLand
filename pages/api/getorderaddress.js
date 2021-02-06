import mysql from 'mysql'


export default async (req,res) => {
  
  return new Promise(resolve => {
    const con = mysql.createConnection({
  host:'5.57.72.163',
  user:'sajt',
  password:'1',
  database:'gazzele_web',
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000
});
    res.statusCode = 200
  res.setHeader('Content-Type','application/json')

  if(req.query.id != undefined){
      var id = req.query.id
      con.query("SELECT * FROM partneraddress WHERE foreign_partneraddressid_web = ?",id,function(err,result,fields){
      if(err) throw err;
      res.json(result)
      resolve()
    })
      con.end();
  }
    
  
  
  })
  
}