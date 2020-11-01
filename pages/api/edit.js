// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import con from '../../store/db.js'
import formidable from 'formidable-serverless';
import uploadImage from '../../store/uploadgc';
import fs from 'fs';
var imageUrl = "";
var image4db = "";
var nameImg = "";
var folder = "upload";
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
      // form.on('fileBegin',(name,file) => {
      //   var randomNum1 = Math.floor((Math.random() * 10000) + 10);
      //   var randomNum2 = Math.floor((Math.random() * 10000) + 10);
      //   var randomNum3 = Math.floor((Math.random() * 10000) + 10);
      //   imageUrl = "./public/upload/"+randomNum1+"-"+randomNum2+randomNum3+"-"+file.name;
      //   image4db = "/upload/"+randomNum1+"-"+randomNum2+randomNum3+"-"+file.name;
      //   file.path = imageUrl;
      // })
      form.parse(req,(err,fields,files) => {
        var thumb;
        if(files.thumb != undefined){
          nameImg = files.thumb.name;
          var thumbfile = files.thumb
       
        
        
        var randomNum1 = Math.floor((Math.random() * 10000) + 10);
        var randomNum2 = Math.floor((Math.random() * 10000) + 10);
        var randomNum3 = Math.floor((Math.random() * 10000) + 10);
        var replaced = nameImg.replace(/ /g,"_")
        var finishPath = folder+"/"+randomNum1+randomNum2+randomNum3+replaced
        fs.readFile(thumbfile.path,function(err,buffer){
          
          uploadImage(finishPath,buffer);
        })
        
      }
        if(nameImg == ""){
          thumb = "";
        }else{
          
          thumb = `https://storage.googleapis.com/traktorland/${finishPath}`
        }
        var ime = fields["ime"];
        var proizvodjac = fields["proizvodjac"];
        var kataloski_broj = fields["kataloski_broj"];
        var mp_cena = fields["mp_cena"];
        var vp_cena = mp_cena - (mp_cena*20/120);
        var tip = fields["tip"];
        var sifra = fields["sifra"];
        var kolicina = fields["kolicina"]
        var thumb = thumb;
        var id = fields["id"]
        if(thumb == ""){
          
          con.query(`UPDATE proizvodi SET ime = ?,proizvodjac=?,kataloski_broj=?,
           mp_cena = ?,vp_cena = ?,tip = ?,sifra = ?,kolicina = ? WHERE id = ?`,[ime,proizvodjac,kataloski_broj,
           mp_cena,vp_cena.toFixed(2),tip,sifra,kolicina,id],(err,result) => {
        if(err) throw err;
        
        res.end(JSON.stringify({ result: 'Success' }))
        resolve();
      })
        }else{
          
          con.query(`UPDATE proizvodi SET ime = ?,proizvodjac=?,kataloski_broj=?,
           mp_cena = ?,vp_cena = ?,tip = ?,sifra = ?,kolicina = ?,thumb=? WHERE id = ?`,[ime,proizvodjac,kataloski_broj,
           mp_cena,vp_cena.toFixed(2),tip,sifra,kolicina,thumb,id],(err,result) => {
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
