import con from '../../store/db.js'


export default async (req,res) => {
  
  return new Promise(resolve => {
    res.statusCode = 200
  res.setHeader('Content-Type','application/json')
  if(req.query.id != undefined){
      var id = req.query.id
      con.query("SELECT * FROM document WHERE documentid = ?",id,function(err,result,fields){
      if(err) throw err;
      res.send(JSON.stringify(result))
      res.end()
      resolve()
    })
  }else if(req.query.zavrseni != undefined){
      var value = req.query.zavrseni
      con.query("SELECT * FROM document WHERE zavrsen = ?",value,function(err,result,fields){
      if(err) throw err;
      res.send(JSON.stringify(result))
      res.end()
      resolve()
    })
  }
  else if(req.query.order_id != undefined){
      var id = req.query.order_id
      con.query("SELECT * FROM documentitem WHERE documentid = ?",id,function(err,result,fields){
      if(err) throw err;
      var result_stringify = JSON.stringify(result)
      var ids_qty = []
      var ids = []
      result.map((item) => {
        ids_qty.push({pro_id:item.productid,qty:item.quantity})
        ids.push(item.productid)
      
      })
      con.query("SELECT * FROM product WHERE productid IN (?)",[ids],function(err,result,fields){
        var result_withqty = []
        result.map((item) => {
          ids_qty.map((numb) => {
            if(numb.pro_id == item.productid){
              item["qty"] = numb.qty
              item["slika"] = item.thumb 
              item["price"] = item.price
              result_withqty.push(item)
            }
          })
        })
        res.send(JSON.stringify(result))
        res.end()
        resolve()
      })
      
    })
  }
  else{
    con.query("SELECT * FROM document",function(err,result,fields){
      if(err) throw err;
      res.send(JSON.stringify(result))
      res.end()
      resolve()
    })
  }
    
  
  
  })
  
}