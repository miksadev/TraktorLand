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
        console.log(fields)
        var price = 0;
        var order = JSON.parse(fields['postData']);
        var rabat = order["rabat"]
        var allorders = JSON.parse(order['orderdata']).items
        allorders.map((item) => {
          var cena = Number(item.qty) * Number(item.price)
          price = price + cena

        })
        var d = new Date()
        var created = d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()
        var order4db = {
          ime_prezime: order['ime']+" "+order['prezime'],
          adresa:order['adresa'],
          price:price,
          email:order['email'],
          grad:order['grad'],
          postanski_broj:order['postanski_broj'],
          telefon:order['telefon'],
          created:created,
          rabat:rabat
        }
        res.end(JSON.stringify({ result: 'Success' }))
        resolve();
      
        
      con.query("INSERT INTO orders SET ?", order4db,(err,result) => {
        if(err) throw err;
        var order_id = result.insertId
        var insertRow = []
        allorders.map((item) => {
        var fullorder = []
        fullorder.push(order_id)
        fullorder.push(item.id)
        fullorder.push(item.qty)
        insertRow.push(fullorder)
        })
        
        
        con.query("INSERT INTO fullorder (order_id,proizvod_id,qty) VALUES ?",[insertRow],(err,result) => {
          if(err) throw err;
          console.log(result)
           res.end(JSON.stringify({ result: 'Success' }))
        resolve();
        })
       
      })
    
  })
 
  
  }else{
    res.redirect('/')
    res.end();
    resolve();
  }
  })
}
