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
          var ime = fields["ime"];
        var prezime = fields["prezime"];
        var telefon = fields["telefon"];
        var naziv_firme = fields["naziv_firme"];
        var pib = fields["pib"];
        var email = fields["email"];
        var adresa = fields["adresa"];
        var grad = fields["grad"]
        var postanskibroj = fields["postanskibroj"];
        var oldemail = fields["oldemail"]
        if(email != oldemail){
          
          var secret = "traktorlandsecret";
          var username = email;
          var token = jwt.sign({username:username},secret)
           var cookies = new Cookies(req,res)
                cookies.set('auth-token',token,{
                    httpOnly:true,
                    sameSite:'lax'
                })
        }
        
        con.query(`UPDATE users SET ime = ?,prezime = ?,telefon=?,naziv_firme=?,
          pib = ?,email = ?,adresa = ?,grad = ?,postanski_broj = ? 
         WHERE email = ?`,[ime,prezime,telefon,naziv_firme,pib,email,adresa,grad,postanskibroj,oldemail],(err,result) => {
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
