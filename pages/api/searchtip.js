import mysql from 'mysql'
import formidable from 'formidable-serverless';

var async = require('async');
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
    if(req.query.search != undefined && req.query.tip != undefined ){
        var sub = req.query.sub;
  var search = req.query.search
  var tip = req.query.tip
  var offset = req.query.offset
  var kolona = req.query.searchkolona
  var sql;
      var que;
  var search_start="%"+search+"%"
    if(req.query.sub == ""){
        que = tip
        if(que == "delovi"){
      que = "Delovi Za Poljoprivredne Mašine"
    }else if(que == "mehanizacija"){
      que = "Poljoprivredna Mehanizacija"
    }
        sql = "SELECT t4.*,t5.amount AS qty FROM categorypr t1 INNER JOIN categorypr t2 ON t2.parentid = t1.categoryprid OR t2.categoryprid = t1.categoryprid INNER JOIN productcategorypr t3 ON t3.categoryprid = t2.categoryprid INNER JOIN product t4 ON t3.productid = t4.productid INNER JOIN productwarehouse t5 ON t4.productid = t5.productid WHERE t1.name LIKE ? AND t4."+kolona+" LIKE ? LIMIT 20 OFFSET "+offset;
      }else{
        que = sub
        sql = "SELECT t3.*,t4.amount AS qty FROM categorypr t1 INNER JOIN productcategorypr t2 ON t1.categoryprid = t2.categoryprid OR t2.categoryprid = t1.parentid INNER JOIN product t3 ON t2.productid = t3.productid INNER JOIN productwarehouse t4 ON t3.productid = t4.productid WHERE t1.categoryprid = ? AND t3."+kolona+" LIKE ? LIMIT 20 OFFSET "+offset;
      }
  con.query(sql,[que,search_start],(err,results) => {
    if(err) throw err;
    console.log(results.length)
    res.json({results})
    resolve();
  })
  con.end();

  }
})
}