const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
//  Para permitir que o back end seja acessível tanto por http quanto por web socket(tempo real).
//  lembrar de instalar o socket no lado do cliente socket.io-client
const server = require('http').Server(app);
const io = require('socket.io')(server);
/*
    String copiada ao criar um cluster no https://cloud.mongodb.com.
    Lembrar de configurar o Database access e Network access no https://cloud.mongodb.com.
*/
mongoose.connect('',
  { useNewUrlParser: true },
);
app.use((req, res, next) => {
  req.io = io;
  // O next garante que esse use() seja executado e os outros uses também.
  next();
});
// Cors permite que o back end seja acessível pelo front end(react), mesmo estando em domínios diferentes.
app.use(cors());
// Toda vez que o usuário acessar a rota /files vai acessar o resized. 
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
app.use(require('./routes'));
// app.listen(3000);
server.listen(3000);
