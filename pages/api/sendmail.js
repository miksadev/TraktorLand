import formidable from 'formidable-serverless';
import nodemailer from 'nodemailer'

export const config = {
  api: {
    bodyParser: false
  }
};

export default async (req,res) => {
    return new Promise(resolve => {
      if(req.method == "POST"){
    res.sendStatus = 200
     res.setHeader('Content-Type', 'application/json')

      const form = new formidable.IncomingForm()
      
      form.parse(req,(err,fields,files) => {
        
        var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:'traktorland80@gmail.com',
      pass:'traktorlandsecret'
    }
  })

  var mailOptions = {
        from:'traktorland80@gmail.com',
        to:fields["email"],
        subject:'Forgot Password Traktorland',
        text:'Forgot Password',
        html:'<a href='+fields["url"]+'>Promeni sifru</a>'
    }
  transporter.sendMail(mailOptions,(err,info) => {
    if(err){
      res.json({result:'Failed'})
      resolve();
    };
    
    res.json({result:'Success'})
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



                    
                    