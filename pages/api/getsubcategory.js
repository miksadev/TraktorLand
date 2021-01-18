import con from '../../store/db.js'


export default async (req,res) => {
  
  return new Promise(resolve => {
    res.statusCode = 200
  res.setHeader('Content-Type','application/json')
  
      var name = req.query.name
      if(name == "delovi"){
      name = "Delovi Za Poljoprivredne Mašine"
    }else if(name == "mehanizacija"){
      name = "Poljoprivredna Mehanizacija"
    }
      con.query("SELECT * FROM categorypr WHERE name LIKE ? ",[name],function(err,result,fields){
      if(err) throw err;
      var id = result[0].categoryprid
      con.query("SELECT * FROM categorypr WHERE parentid = ?",[id],function(err,result){
        res.json(result)
      resolve()
      })
    })
 
    
  
  
  })
  
}