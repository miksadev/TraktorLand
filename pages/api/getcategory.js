import con from '../../store/db.js'
import formidable from 'formidable-serverless';

export default async (req,res) => {
	return new Promise(resolve => {
    if(req.query.id != undefined){
      var id = req.query.id
    con.query("SELECT * FROM categorypr WHERE id = ?",id,(err,results) => {
            res.json({data:results[0]})
           
            resolve();
          
        })
  }else if(req.query.idfparent != undefined){
    var id = req.query.idfparent
    var obj = {}
    con.query("SELECT * FROM categorypr WHERE categoryprid = ?",id,(err,result) => {
      var targetCategory = result
            if(result[0].parentid == 0){
              obj["parent"] = false
              obj["category"] = targetCategory
              con.query("SELECT * FROM categorypr WHERE parentid = ?",[targetCategory[0].categoryprid],(err,result) => {
                obj["subcategory"] = result
                  res.json(obj)
                
                  resolve();
              })
            }else{
              con.query("SELECT * FROM categorypr WHERE categoryprid = ?",[result[0].parentid],(err,result) => {
                obj["parent"] = result
                obj["category"] = targetCategory
                 con.query("SELECT * FROM categorypr WHERE parentid = ?",[result[0].categoryprid],(err,result) => {
                  obj["subcategory"] = result
                  res.json(obj)
               
                  resolve();
                 })
              })
            }
           
          
        })
  }
  else if(req.query.productid != undefined){
      var id = req.query.productid
    con.query("SELECT * FROM productcategorypr WHERE productid = ?",id,(err,results) => {
            res.json({data:results})
        
            resolve();
          
        })
  }else if(req.query.name != undefined){
    var name = req.query.name
    if(name == "delovi"){
      name = "Delovi Za Poljoprivredne Mašine"
    }else if(name == "mehanizacija"){
      name = "Poljoprivredna Mehanizacija"
    }
    con.query("SELECT * FROM categorypr WHERE name LIKE ?",name,(err,results) => {
            
            con.query("SELECT * FROM categorypr WHERE parentid = ?",[results[0].categoryprid],(err,result) => {
              res.json({result})
              
              resolve();
            })
          
        })
  }else{
    con.query("SELECT * FROM categorypr ",(err,results) => {
            res.json({data:results})
          
            resolve();
          
        })
  }
})
}


