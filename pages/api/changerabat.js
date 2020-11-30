// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import con from '../../store/db.js'
import formidable from 'formidable-serverless';
import Cookies from 'cookies';
import jwt from 'jsonwebtoken';
export const config = {
  api: {
    bodyParser: false
  }
};
export default async (req, res) => {
	return new Promise(resolve => {
    if(req.method == "POST"){
    res.sendStatus = 200
     res.setHeader('Content-Type', 'application/json')
     const form = new formidable.IncomingForm()
     form.parse(req,(err,fields,files) => {
         var id = fields["id"];
         var rabat = fields["rabat"]
        console.log(fields)
        con.query(`UPDATE partner SET rabat = ? WHERE partnerid = ?`,[rabat,Number(id)],(err,result) => {
          if(err) throw err;

          res.end(JSON.stringify({ result: 'Success' }))
          resolve();
        })
     })
  
  }else{
    res.redirect('/')
    res.end();
    resolve();
  }
  })
}
