const express = require('express');
const controllers = require('./controllers');

const app = express();

app.get('/productos', controllers.productosController);

app.get('/productoRandom', controllers.productoRandomController);


const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

server.on('error', err => {
    console.log(`Error en servidor: ${err}`);
});
