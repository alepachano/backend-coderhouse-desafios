const express = require('express');
const productosRouter = require('./productosRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.use('/productos', productosRouter);

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

server.on('error', err => {
    console.log(`Error en servidor: ${err}`);
});