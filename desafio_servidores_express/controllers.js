const Contenedor = require('./desafio_contenedor');
const contenedor = new Contenedor('productos.txt');


const productosController = async (req, res) => {
    const showAll = await contenedor.getAll()
    res.send(showAll);
};
  
const productoRandomController = async (req, res) => {
    const productList = await contenedor.getAll();
	const randomNumber = Math.floor(Math.random() * productList.length);
	res.send(productList[randomNumber]);
};
  
module.exports = {
    productosController,
    productoRandomController
};
  