import con from '../../store/db.js'
import formidable from 'formidable-serverless';

export default async (req,res) => {
	return new Promise(resolve => {

    if(req.query.search != undefined && req.query.tip != undefined ){

      var sub = req.query.sub;
      var search = req.query.search
      var tip = req.query.tip
      var kolona = req.query.searchkolona
      var search_start;
  
      if(kolona == "ime"){
        search_start=search+"%"
      }else{
        search_start=search+"%"
      }
      var sql;
      var que;
      if(req.query.sub == ""){
        que = tip
        if(que == "delovi"){
      que = "Delovi Za Poljoprivredne Mašine"
    }else if(que == "mehanizacija"){
      que = "Poljoprivredna Mehanizacija"
    }
        sql = "SELECT * FROM categorypr WHERE name LIKE ?";
      }else{
        que = sub
        sql = "SELECT * FROM categorypr WHERE categoryprid = ?";
      }
      
      
    con.query(sql,[que],function(err,result){
        if(err) throw err;
        
        var id = result[0].categoryprid;
        con.query("SELECT * FROM categorypr WHERE parentid = ?",[id],function(err,result){
          if(err) throw err;
         
          var ids = [id]
          result.map(item => {
              ids.push(item.categoryprid)
          })
          con.query("SELECT * FROM productcategorypr WHERE categoryprid IN (?)",[ids],function(err,result){
            if(err) throw err;
            if(result.length == 0){
              res.send(JSON.stringify({results:[]}))
              res.end()
              resolve();
            }else{
              var productids = []
            result.map(item => {
              productids.push(item.productid)
            })
            con.query("SELECT * FROM product WHERE name LIKE ? AND productid IN (?)",[search_start,productids],function(err,results){
              if(err) throw err;
             
              res.send(JSON.stringify({results}))
              res.end()
              resolve();
            })
            }
            
          })
        })
    })
  }
})
}