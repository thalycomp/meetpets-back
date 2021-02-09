require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

const routes = require('./routes');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use('/qrcode', express.static(path.resolve(__dirname, '..', 'tmp', 'qrcodes') ))

app.use(routes);


  app.listen(process.env.PORT || 3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  
});
