const User = require('../models/userModel')
const qr = require('qr-image')
const fs = require('fs')
const pdfkit = require('pdfkit')

exports.pdf = async function(req,res){
    try{
    const user = await User.buscaPorId(req.params.id)
    const pdf = new pdfkit()

    const code = pdf.image(`tmp/qrcodes/${user._id}.png`, 300, 300);
    code.pipe(fs.createWriteStream(`tmp/pdf/${user._id}.pdf`));

    pdf.end();

    return res.status(200).json("PDF gerado com sucesso")

    }catch(err){ 
        console.log(err)
        return res.status(400).json({ error: e }); }
}