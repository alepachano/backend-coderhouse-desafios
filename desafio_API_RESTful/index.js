const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

const server = app.listen(PORT, () => console.log(`Servidor HTTP escuchando en el puerto ${PORT}`));

server.on('error', err => console.log(`Error en servidor: ${err}`));

const productos = [{
        title: "mochila",
        price: 40,
        thumbnail: "https://cdn.shopify.com/s/files/1/0399/2656/2966/products/regular-classic-mirabella-2_-21481965-88a7-4f82-ab58-5664ee0f651e_1000x1000.jpg?v=1669422951",
        id : 1
    },
    {
        title: "polera",
        price: 20,
        thumbnail: "https://americaneaglecl.vtexassets.com/arquivos/ids/726940-1200-auto?v=637898281729970000&width=1200&height=auto&aspect=true",
        id : 2
    },
    {   
        id: 3, 
        title: "jeans",
        price: 60,
        thumbnail: "https://americaneaglecl.vtexassets.com/arquivos/ids/779869/4363789583_1.jpg?v=637933204000400000"
    },
];


app.get('/', (req, res) => {
    return res.send('Desafio API RESTful');
});


app.get('/api/productos', (req, res) => {
    return res.send(productos);
});


app.get('/api/productos/:id', (req, res) => {
    const { id } = req.params;
    const idProduct = productos.find(idProduct => idProduct.id === Number(id));

    if (!idProduct) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        });
    }

    return res.json(idProduct);
});


app.post('/api/productos', (req, res) => {
    const product = req.body;
    product.id = productos.length + 1;
    productos.push(product);

    return res.status(201).json(product);
});


app.put('/api/productos/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const idProduct = productos.find(idProduct => idProduct.id === Number(id));

    if (!idProduct) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        });
    };

    idProduct.title = body.title;
    idProduct.price = body.price;
    idProduct.thumbnail = body.thumbnail;
    return res.json(idProduct);
});


app.delete('/api/productos/:id', (req, res) => {
    const { id } = req.params;
    const index = productos.findIndex(product => product.id === Number(id));

    if (index === -1) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        });
    }

    productos.splice(index, 1);
    return res.status(204).json({});
});

