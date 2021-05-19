// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mysql from 'mysql'
export default (req, res) => {
 	res.statusCode = 200
	res.setHeader('Content-Type','application/json')
	const con = mysql.createConnection({
	host:'188.93.122.197',
	user:'sajt',
	password:'1',
	database:'gazzele_webmarjanovic',
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000
});
	con.query("SELECT t4.* FROM categorypr t1 INNER JOIN categorypr t2 ON t2.parentid = t1.categoryprid INNER JOIN productcategorypr t3 ON t3.categoryprid = t2.categoryprid INNER JOIN product t4 ON t4.productid = t3.productid WHERE t1.categoryprid = 13",(err,results) => {
		res.json(results)
	})
	
}
