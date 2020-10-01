import con from '../../store/db.js'


export default (req,res) => {
	
	res.statusCode = 200
	res.setHeader('Content-Type','application/json')
	if(req.query.tip != undefined){
		con.query("SELECT * FROM proizvodi WHERE tip = ?",[req.query.tip],function(err,result,fields){
			if(err) throw err;
			res.send(JSON.stringify(result))
		})
	}
	if(req.query.id != undefined){
		con.query("SELECT * FROM proizvodi WHERE id = ?",[req.query.id],function(err,result,fields){
			if(err) throw err;
			res.send(JSON.stringify(result))
		})
	}
	if(req.query.id == undefined && req.query.tip == undefined){
		con.query("SELECT * FROM proizvodi",function(err,result,fields){
			if(err) throw err;
			res.send(JSON.stringify(result))
		})
	}
	
}