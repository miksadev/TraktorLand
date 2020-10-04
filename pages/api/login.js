// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import con from '../../store/db.js'
import formidable from 'formidable-serverless';
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
        var email = fields["email"];
        var password = fields["password"];

      
      con.query('SELECT * FROM users WHERE email = ? AND lozinka = ?',[email,password],(err,result) => {
        if(err) throw err;
        
        if(result.length == 0){
          res.end(JSON.stringify({result:'Failed'}));
          resolve()
        }else{
          var secret = "traktorlandsecret";
          var username = email;
          var token = jwt.sign({username:username},secret)
          res.end(JSON.stringify({result:'Success',authToken:token}))
          resolve();
        }
      })  
      
    
  })
 
  
  }else{
    res.redirect('/')
    res.end();
    resolve();
  }
    })
}
