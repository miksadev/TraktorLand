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
       
        
        var order = JSON.parse(fields['postData']);
        var price = 0;
        var price2 = 0;
        var partnerid;
        var userrabat = fields["userrabat"]
        var allorders = JSON.parse(fields['items']);
        

        if(order["partnerid"] == undefined){
          partnerid = 9999;
        }else{
          partnerid = order["partnerid"]
        }
       
        allorders.map((item) => {
          var cena = Number(item.qty) * Number(item.price)
          price = price + cena;
          if(userrabat == 1){
            var cena2 = Number(item.qty) * Number(item.price1)
            price2 = price2 + cena2;
          }else if(userrabat == 2){
            var cena2 = Number(item.qty) * Number(item.price2)
            price2 = price2 + cena2;  
          }else if(userrabat == 3){
            var cena2 = Number(item.qty) * Number(item.price3)
            price2 = price2 + cena2;  
          }else{
            var cena2 = Number(item.qty) * Number(item.price)
            price2 = price2 + cena2;  
          }
        })
          
         
        var d = new Date()
        var created = d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()
        var time = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();

        var d2 = new Date()
        var created2 = d2.getFullYear()+"-"+(d2.getMonth()+1)+"-"+d2.getDate()

        if(order['pravno_lice'] != 1){
          var partneraddress4db = {
          address:order['address'],
          city:order['city'],
          zip:order['zip'],
          partnerid:partnerid,
          email:order['email'],
          phone:order['phone']
        }
      }else{
        var partneraddress4db = {
          address:order['address'],
          city:order['city'],
          zip:order['zip'],
          partnerid:partnerid,
          email:order['email'],
          phone:order['phone'],
          pib:order["code"],
          naziv_firme:order["naziv_firme"]
        }
      }

        
        // res.end(JSON.stringify({ result: 'Success' }))
        // resolve();

      con.query("INSERT INTO partneraddress SET ?",partneraddress4db,(err,result) => {
        if(err) throw err;
        var document4db = {
          documentdate:created2,
          valutedate:created2,
          documentissuedate:created2,
          partnerid:partnerid,

          status:'n',
          foreign_partneraddressid:result.insertId,
          processtype:'WEB',
          processed:'n',
          retrieved:'y',
          price:price,
          price2:price2,
          ime_prezime:order["name"]
          
        }
        con.query("INSERT INTO document SET ?",document4db,(err,result) => {
          if(err) throw err;
          var insertRow = []
          allorders.map((item) => {
            var fullorder = []
            fullorder.push(result.insertId)
            fullorder.push(item.id)
            fullorder.push(20)
            fullorder.push(item.qty*item.price)
            fullorder.push(item.qty)
            fullorder.push(Number(item.price*100/120))
            fullorder.push(Number(item.price))
            if(userrabat == 1){
                fullorder.push(item.price1)
            }else if(userrabat == 2){
                fullorder.push(item.price2)
            }else if(userrabat == 3){
                fullorder.push(item.price3)
            }else{
                fullorder.push(item.price)
            }
            insertRow.push(fullorder)
          })
          
          con.query("INSERT INTO documentitem (documentid,productid,taxvalue,itemvalue,quantity,price,price1,price2) VALUES ?",[insertRow],(err,result) => {
            if(err) throw err;
            res.json({ result: 'Success' })
            resolve();
          })
          
        })
         
      })
        
      // con.query("INSERT INTO orders SET ?", order4db,(err,result) => {
      //   if(err) throw err;
      //   var order_id = result.insertId
      //   var insertRow = []
      //   allorders.map((item) => {
      //   var fullorder = []
      //   fullorder.push(order_id)
      //   fullorder.push(item.id)
      //   fullorder.push(item.qty)
      //   insertRow.push(fullorder)
      //   })
        
        
      //   con.query("INSERT INTO fullorder (order_id,proizvod_id,qty) VALUES ?",[insertRow],(err,result) => {
      //     if(err) throw err;
          
      //   })
       
      // })
    
  })
 
  
  }else{
    res.redirect('/')
    res.end();
    resolve();
  }
  })
}
