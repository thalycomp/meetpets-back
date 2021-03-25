const User = require('../models/userModel')
const qr = require('qr-image')
const fs = require('fs')


exports.qrcode = async function(req,res){

    try{
        
        const user = await User.buscaPorId(req.params.id)
    
        //const url = `http://localhost:3000/${user._id}`
        const url = `https://meetpets-qrcode.herokuapp.com/${user._id}`
        const code = qr.image(url, {type: 'png'})
        res.type('png')

        const qrcode = fs.createWriteStream(`tmp/qrcodes/${user._id}.png`);
        code.pipe(qrcode)
        code.pipe(res)

        //const fota = fs.readFileSync(`tmp/qrcodes/${user._id}.png`);
        

       //res.send(fota)
        //return res.status(200).json(url)
    
        }catch(e){
            console.log(e)
            return res.status(400).json({ error: e }); 
        }
           
    }
    
