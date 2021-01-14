
import con from '../../store/db.js'
import formidable from 'formidable-serverless';
var globallimit = 10;
var globaloffset = 0;
var globaldata = [];
var globaldata4off = [];
var globalsearch = "";
var limit_  = 0;
const getCategoryFinish = function(item){
  return new Promise((resolve,reject) => {
    con.query("SELECT * FROM categorypr WHERE categoryprid = ?",[item.kategorijaid],(err,results) => {
             if(results.length == 0){
                resolve("false")
              }else{
                if(results[0].parentid == null || results[0].parentid == ""){
                  item["kategorija"] = results[0].name
                  resolve(item)
                }else{
                  con.query("SELECT * FROM categorypr WHERE categoryprid = ?",[results[0].parentid],(err,results) => {
                    item["kategorija"] = results[0].name
                    resolve(item)
                  })
                }
                
              }
      })
  })
}
const getCategory = function(item){
  return new Promise((resolve,reject) => {
    con.query("SELECT * FROM productcategorypr WHERE productid = ?",[item.productid],(err,results) => {
        
        if(results.length == 0){
          resolve("false")
        }else{
          item["kategorijaid"] = results[0].categoryprid
          resolve(item)
        }
    })
  })
}
const getData = function(sea){
  return new Promise((resolve,reject)=>{
    console.log("CALL")
    console.log(globaldata4off)
      var search = sea
      var offset = globaloffset
      
    con.query("SELECT * FROM product WHERE name LIKE ? ORDER BY productid ASC LIMIT "+limit_+" OFFSET "+offset,"%"+search+"%",async (err,results) => {
           
            
            if(results.length == 0){
              resolve("end");
            }
            var forfinish = []
            
            for(let item of results){
              var value = await getCategory(item).then((val) => {
                return val
              });
              if(value != "false"){
                forfinish.push(value)
              }
            }
            if(forfinish.length == 0){
              resolve("allno")
            }else{
              for(let item of forfinish){
              var value = await getCategoryFinish(item).then((val)=>{
                return val;
              });
              if(!globaldata4off.includes(value.productid)){

               globaldata.push(value)
                globaldata4off.push(value.productid)
              
              }  
            }
            resolve("next")
            }
            
            
        })
})
}


function loop(promise,res){
 return promise.then((val) =>{

    if(val == "end"){
       res.end(JSON.stringify({results:globaldata}))

       globaldata = []
       globaloffset = 0;
       globalsearch = "";
    }else if(val == "allno"){
          if(limit_ == 40){
            globaloffset+=40
          }else{
            globaloffset+=10
          }
        return loop(getData(globalsearch),res);
        
    }else{
      if(globaldata.length >= limit_){
        res.end(JSON.stringify({results:globaldata}))
        globaldata = []
        globaloffset = 0;
        globalsearch = "";
      }else{
          if(limit_ == 40){
            globaloffset+=40
          }else{
            globaloffset+=10
          }
        return loop(getData(globalsearch),res)

      }
    }
 })
}


export default async (req,res) => {
  return new Promise(resolve => {

    if(req.query.search != undefined && req.query.tip == undefined){
      globalsearch = req.query.search
      limit_  = req.query.limit
     
      if(req.query.offset == 0){
        globaldata4off = []
      }
      loop(getData(globalsearch),res)
     
  }else if(req.query.search != undefined && req.query.tip != undefined){
    var search = req.query.search
    var tip = req.query.tip
    con.query("SELECT * FROM product WHERE name LIKE ? AND type = ? ORDER BY name ASC LIMIT 10",[search+"%",tip],(err,results) => {
          
            res.send(JSON.stringify({results}))
            res.end()
            resolve();
          
        })
  }else if(req.query.resetglobal != undefined){
    globaldata4off = [];
      res.send(JSON.stringify({msg:"success"}))
      res.end()
      resolve();
  }
})
}
