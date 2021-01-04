import con from '../../store/db.js'


export default async (req,res) => {
	
	return new Promise(resolve => {
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
		con.query("SELECT * FROM categorypr WHERE name LIKE ?",[name],function(err,result){
			if(err) throw err;
			
			var categoryid = result[0].categoryprid;
			
			var ids = [categoryid]
			con.query("SELECT * FROM categorypr WHERE parentid = ?",[categoryid],function(err,result){
				
				if(result.length == 0){
				var productsid = []

					con.query("SELECT * FROM productcategorypr WHERE categoryprid IN (?)",[ids],function(err,result){
						
						if(result.length != 0){
							result.map(item => {
							productsid.push(item.productid)
						})
						con.query("SELECT * FROM product WHERE productid IN (?) LIMIT 40 OFFSET "+offset,[productsid],function(err,result){

							if(result.length == 0){
								res.send(JSON.stringify([]))
								res.end()
								resolve()
							}
							var data = result
							var count = result.length
							var result2 = []
							var num = 1
							result.map((item) => {
								con.query("SELECT * FROM productamount WHERE productid = ?",item.productid,(err,result) => {
									data[num-1]["qty"] = result[0].productamountb2b
									result2.push(data[num-1])
									
									if(num == count){
										
										res.send(JSON.stringify(result2))
										res.end()
										resolve()
									}
									num++
								})
							})
						})
					}else{
						res.send(JSON.stringify([]))
							res.end()
							resolve()
					}
					})
				}else{
					if(result.length != 0){
						result.map(item => {
						ids.push(item.categoryprid)
					})
					var productsid = []
					con.query("SELECT * FROM productcategorypr WHERE categoryprid IN (?)",[ids],function(err,result){
						
						result.map(item => {
							productsid.push(item.productid)
						})
						con.query("SELECT * FROM product WHERE productid IN (?) LIMIT 40 OFFSET "+offset,[productsid],function(err,result){
							
							
							if(result.length == 0){
								res.send(JSON.stringify([]))
								res.end()
								resolve()
							}
							var data = result
							var count = result.length
							var result2 = []
							var num = 1
							result.map((item) => {
								con.query("SELECT * FROM productamount WHERE productid = ?",item.productid,(err,result) => {
									data[num-1]["qty"] = result[0].productamountb2b
									result2.push(data[num-1])
									
									if(num == count){
										
										res.send(JSON.stringify(result2))
										res.end()
										resolve()
									}
									num++
								})
							})


						})
					})
				}else{
					res.send(JSON.stringify([]))
							res.end()
							resolve()
				}
				}
			})
		})
	}
	if(req.query.id != undefined){

		con.query("SELECT * FROM product WHERE productid = ?",req.query.id, function(err,result,fields){
			if(err) throw err;
				var data = result
				var count = result.length
				var result2 = []
				var num = 1
				result.map((item) => {
					con.query("SELECT * FROM productamount WHERE productid = ?",item.productid,(err,result) => {
						data[num-1]["qty"] = result[0].productamountb2b
						result2.push(data[num-1])
						
						if(num == count){
							
							res.send(JSON.stringify(result2))
							res.end()
							resolve()
						}
						num++
					})
				})
			
			
			
		})
	}
	if(req.query.id == undefined && req.query.tip == undefined){
		var offset = req.query.offset;
		con.query("SELECT * FROM product ORDER BY name ASC LIMIT 40 OFFSET "+offset, function(err,result,fields){
			if(err) throw err;
			if(result.length == 0){
				res.send(JSON.stringify([]))
				res.end()
				resolve()
			}
				var data = result
				var count = result.length
				var result2 = []
				var num = 1
				result.map((item) => {
					con.query("SELECT * FROM productamount WHERE productid = ?",item.productid,(err,result) => {
						data[num-1]["qty"] = result[0].productamountb2b
						result2.push(data[num-1])
						
						if(num == count){
							
							res.send(JSON.stringify(result2))
							res.end()
							resolve()
						}
						num++
					})
				})
			
			
			
		})
	}
	})
	
}