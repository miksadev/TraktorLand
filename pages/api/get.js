import con from '../../store/db.js'


export default async (req,res) => {
	
	return new Promise(resolve => {
		res.statusCode = 200
	res.setHeader('Content-Type','application/json')
	if(req.query.tip != undefined){
		con.query("SELECT * FROM product LIMIT 20",[req.query.tip],function(err,result,fields){
			if(err) throw err;
			res.send(JSON.stringify(result))
			res.end()
			resolve()
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