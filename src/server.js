require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');

//mongoose.connect("mongodb://127.0.0.1:27017/meetpets", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
//mongoose.connect("mongodb+srv://rachidb:rjr290493@cluster0.kmkez.mongodb.net/meetpets?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

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
