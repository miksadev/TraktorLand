// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import con from '../../store/db.js'
import formidable from 'formidable-serverless';
var imageUrl = "";
var image4db = "";

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
      form.on('fileBegin',(name,file) => {
        var randomNum1 = Math.floor((Math.random() * 10000) + 10);
        var randomNum2 = Math.floor((Math.random() * 10000) + 10);
        var randomNum3 = Math.floor((Math.random() * 10000) + 10);
        imageUrl = "./public/upload/"+randomNum1+"-"+randomNum2+randomNum3+"-"+file.name;
        image4db = "/upload/"+randomNum1+"-"+randomNum2+randomNum3+"-"+file.name;
        file.path = imageUrl;
      })
      form.parse(req,(err,fields,files) => {
        
        var ime = fields["ime"];
        var proizvodjac = fields["proizvodjac"];
        var kataloski_broj = fields["kataloski_broj"];
        var mp_cena = fields["mp_cena"];
        var vp_cena = fields["vp_cena"];
        var tip = fields["tip"];
        var sifra = fields["sifra"];
        var kolicina = fields["kolicina"]
        var thumb = image4db;
        var id = fields["id"]
        if(image4db == ""){
          
          con.query(`UPDATE proizvodi SET ime = ?,proizvodjac=?,kataloski_broj=?,
           mp_cena = ?,vp_cena = ?,tip = ?,sifra = ?,kolicina = ? WHERE id = ?`,[ime,proizvodjac,kataloski_broj,
           mp_cena,vp_cena,tip,sifra,kolicina,id],(err,result) => {
        if(err) throw err;
        
        res.end(JSON.stringify({ result: 'Success' }))
        resolve();
      })
        }else{
          
          con.query(`UPDATE proizvodi SET ime = ?,proizvodjac=?,kataloski_broj=?,
           mp_cena = ?,vp_cena = ?,tip = ?,sifra = ?,kolicina = ?,thumb=? WHERE id = ?`,[ime,proizvodjac,kataloski_broj,
           mp_cena,vp_cena,tip,sifra,kolicina,thumb,id],(err,result) => {
        if(err) throw err;
        
        res.end(JSON.stringify({ result: 'Success' }))
        resolve();
      })
        }
      
        
      
    
  })
 
  
  }else{
    res.redirect('/')
    res.end();
    resolve();
  }
  })
}
