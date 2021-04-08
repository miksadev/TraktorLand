import mysql from 'mysql'

var async = require('async');

export default async (req,res) => {
	
	return new Promise(resolve => {
		const con = mysql.createConnection({
	host:'188.93.122.197',
	user:'sajt',
	password:'1',
	database:'gazzele_webmarjanovic',
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000
});
		res.statusCode = 200
	res.setHeader('Content-Type','application/json')
	// if(req.query.tip != undefined){
	// 	function capitalizeFirstLetter(string) {
	// 	  return string.charAt(0).toUpperCase() + string.slice(1);
	// 	}
	// 	var name = req.query.tip;
	// 	if(name == "delovi"){
	// 		name = "delovi za poljoprivredne mašine";
	// 	}else if(name == ""){
	// 		name = "poljoprivredna mehanizacija"
	// 	}
	// 	con.query("SELECT * FROM categorypr WHERE name LIKE ?",[name],function(err,result,fields){
	// 		if(err) throw err;
	// 		if(result.length != 0){
	// 			var categoryid = result[0].categoryprid;
	// 		con.query("SELECT * FROM productcategorypr WHERE categoryprid = ?",[categoryid],function(err,result){
	// 			if(result.length != 0){
	// 				var productids = []
	// 				result.map(item => productids.push(item.productid))
	// 				con.query("SELECT * FROM product WHERE productid IN (?)",[productids],function(err,result){
	// 					res.send(JSON.stringify(result))
	// 					res.end()
	// 					resolve()
	// 				})
	// 			}else{
	// 				res.send(JSON.stringify([]))
	// 				res.end()
	// 				resolve()
	// 			} 
	// 		})
	// 		}else{
	// 			res.send(JSON.stringify([]))
	// 			res.end()
	// 			resolve()
	// 		}
			
	// 	})
	// }
	if(req.query.tip != undefined){
		
		
		var name = req.query.tip;
		var offset = req.query.offset;
		if(name == "delovi"){
      name = "Delovi Za Poljoprivredne Mašine"
    }else if(name == "mehanizacija"){
      name = "Poljoprivredna Mehanizacija"
    }
		con.query("SELECT t4.*,t1.name AS kategorija,t2.name AS podkategorija,t5.amount AS qty FROM categorypr t1 INNER JOIN categorypr t2 ON t1.categoryprid = t2.parentid OR t1.categoryprid = t2.categoryprid INNER JOIN productcategorypr t3 ON t3.categoryprid = t2.categoryprid OR t3.categoryprid = t1.categoryprid INNER JOIN product t4 ON t4.productid = t3.productid AND t4.active = 'y' INNER JOIN productwarehouse t5 ON t4.productid = t5.productid WHERE t1.name LIKE ? LIMIT 20 OFFSET "+offset,[name],(err,results) => {
    if(err) throw err;
    res.json(results)
    resolve();
  })
		con.end();
	}
	if(req.query.id != undefined){

		con.query("SELECT * FROM product WHERE productid = ? AND active = 'y' ",req.query.id, function(err,result,fields){
			if(err) throw err;
				var data = result
				var count = result.length
				var result2 = []
				var num = 1

				result.map((item) => {
				
					con.query("SELECT * FROM productwarehouse WHERE productid = ?",[item.productid],(err,result) => {
						
						data[num-1]["qty"] = result[0].amount
						result2.push(data[num-1])
						
						if(num == count){
							
							res.json(result2)
							resolve()
						}
						num++
					})
				})
				con.end();
			
			
			
		})
		
	}
	if(req.query.id == undefined && req.query.tip == undefined){
		var offset = req.query.offset;
		con.query("SELECT * FROM product WHERE active = 'y' ORDER BY name ASC LIMIT 20 OFFSET "+offset, function(err,result,fields){
			if(err) throw err;
			if(result.length == 0){
				res.json([])
				resolve()
			}
				var data = result
				var count = result.length
				var result2 = []
				var num = 1
				result.map((item) => {
					con.query("SELECT * FROM productwarehouse WHERE productid = ?",item.productid,(err,result) => {
						data[num-1]["qty"] = result[0].amount
						result2.push(data[num-1])
						
						if(num == count){
							con.end();
							res.json(result2)
							resolve()
						}
						num++
					})
				})
			
			
			
		})
		
	}
	})
	
}