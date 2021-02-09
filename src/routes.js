const express = require('express');
const route = express.Router();
const userController = require('./controllers/userController')
const qrController = require('./controllers/qrController')
const pdfController = require('./controllers/pdfController')


//rotas de usuario
route.post('/', userController.register)
route.get('/:id', userController.show)

//rota de qrcode
route.get('/qr/:id', qrController.qrcode)

//rota de pdf
route.get('/pdf/:id', pdfController.pdf)



//rota não deve ser utilizada na aplicação
route.get('/show/:id', qrController.showqr)


module.exports = route
