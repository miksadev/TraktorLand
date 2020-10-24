// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import con from '../../store/db.js'
import formidable from 'formidable-serverless';
var imageUrl;
var image4db;

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
        var akcija = {
          ime:fields["ime"],
          link_proizvoda:fields["link_proizvoda"],
          thumb:image4db,
          sifra:fields["sifra"]
        }
      
        
      con.query("INSERT INTO akcije SET ?", akcija,(err,result) => {
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
