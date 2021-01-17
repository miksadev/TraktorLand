//import mysql from 'serverless-mysql';
var GOOGLE_CLOUD_DB_USER = process.env.GOOGLE_CLOUD_DB_USER;
var GOOGLE_CLOUD_DB_PASSWORD = process.env.GOOGLE_CLOUD_DB_PASSWORD;
var GOOGLE_CLOUD_DB_TABLE = process.env.GOOGLE_CLOUD_DB_TABLE;
var GOOGLE_CLOUD_DB_HOST = process.env.GOOGLE_CLOUD_DB_HOST;
// const con = mysql({
// 	config:{
// 		host: GOOGLE_CLOUD_DB_HOST,
//     	database: GOOGLE_CLOUD_DB_TABLE,
//     	user: GOOGLE_CLOUD_DB_USER,
//     	password: GOOGLE_CLOUD_DB_PASSWORD
// 	}
// })
import mysql from 'mysql';

const con = mysql.createConnection({
	host:'5.57.72.163',
	user:'sajt',
	password:'1',
	database:'gazzele_web'
});
export default con;