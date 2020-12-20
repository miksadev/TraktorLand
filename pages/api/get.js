import con from '../../store/db.js'


export default async (req,res) => {
	
	return new Promise(resolve => {
		res.statusCode = 200
	res.setHeader('Content-Type','application/json')
	if(req.query.tip != undefined){
		function capitalizeFirstLetter(string) {
		  return string.charAt(0).toUpperCase() + string.slice(1);
		}
		var name = req.query.tip;
		con.query("SELECT * FROM categorypr WHERE name = ?",[capitalizeFirstLetter(name)],function(err,result,fields){
			if(err) throw err;
			var categoryid = result[0].categoryprid;
			con.query("SELECT * FROM productcategorypr WHERE categoryprid = ?",[categoryid],function(err,result){
				var productids = []
				result.map(item => productids.push(item.productid))
				con.query("SELECT * FROM product WHERE productid IN (?)",[productids],function(err,result){
					res.send(JSON.stringify(result))
					res.end()
					resolve()
				})
				
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
						data[num-1]["qty"] = result[0].productamountweb
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
		con.query("SELECT * FROM product", function(err,result,fields){
			if(err) throw err;
				var data = result
				var count = result.length
				var result2 = []
				var num = 1
				result.map((item) => {
					con.query("SELECT * FROM productamount WHERE productid = ?",item.productid,(err,result) => {
						data[num-1]["qty"] = result[0].productamountweb
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