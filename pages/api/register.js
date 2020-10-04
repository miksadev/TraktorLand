// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import con from '../../store/db.js'
import formidable from 'formidable-serverless';

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
        var postanskibroj = fields["postanskibroj"]
        var lozinka = fields["lozinka"]
        var pravno_lice = 0;
        if(naziv_firme != undefined){
          pravno_lice = 1
        }
        
        var user = {
        ime:ime,
        prezime:prezime,
        telefon:telefon,
        naziv_firme:naziv_firme,
        pib:pib,
        email:email,
        adresa:adresa,
        grad:grad,
        postanski_broj:postanskibroj,
        lozinka:lozinka,
        pravno_lice:pravno_lice
        }
      
      con.query('SELECT * FROM users WHERE email = ?',[email],(err,result) => {
        if(err) throw err;
        
        if(result.length != 0){
          res.end(JSON.stringify({result:'Error email'}));
          resolve();
        }else{
            con.query("INSERT INTO users SET ?", user,(err,result) => {
            if(err) throw err;
            
            res.end(JSON.stringify({ result: 'Success' }))
            resolve();
            })
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
