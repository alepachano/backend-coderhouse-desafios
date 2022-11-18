// MANEJO DE ARCHIVOS

const fs = require('fs');

// PRODUCTOS

const product1 = {
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Squadra_45.jpg'
};

const product2 = {
    title: 'Calculadora',
    price: 234.56,
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Casio_fx-85WA_20050529.jpg'
};

const product3 = {
    title: 'Globo Terráqueo',
    price: 345.67,
    thumbnail: 'https://www.tiendita.cl/wp-content/uploads/2022/10/GLOJMI002.jpg'
}

// CLASE CONTENEDOR

class Contenedor {
    constructor(filename) {
        this.filename = filename
    }

    async getData() {
        try {
            const data = await fs.promises.readFile(this.filename, 'utf-8');
            console.log(data)
            return !data ? null : JSON.parse(data);
        } catch (error) {
            console.log(error.message);
        }
    };

    getId(data) {
        try {
            if (data) {
                const ids = data.map(object => {
                    return object.id;
                });
                const max = Math.max(...ids);
                return max + 1;
            }
            return 1;
        } catch (error) {
            console.log(error.message);
        }
    };

    async save(product) {
        try {
            let data = await this.getData();
            product.id = this.getId(data);
            if (data) {
                data.push(product);
            } else {
                data = [product];
            }
            await fs.promises.writeFile(this.filename, JSON.stringify(data));
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    };

    async getAll() {
        try {
            return await this.getData();
        } catch (error) {
            console.log(error.message);
        }
    };

    async deleteById(id) {
        try {
            let data = await this.getData();
            let productById = data.find(product => product.id === id);
            const index = data.indexOf(productById);
            // Si el producto no existe, arrojamos un error controlado.
            if (!productById) {
                throw Error('Producto no existe');
            }
            // removiendo elemento del array en el indice esperado.
            data.splice(index, 1);
            // Actualizamos nuestra base con los productos restantes.
            await fs.promises.writeFile(this.filename, JSON.stringify(data));
        } catch (error) {
            console.log(error.message);
        }
    };

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.filename, '');
            console.log('Todos los elementos han sido eliminados');
        } catch (error) {
            console.log(error.message);
        }
    };
};

const contenedor = new Contenedor('productos.txt');


// contenedor.save(product1);
// contenedor.save(product2);
// const showAll = contenedor.getAll();
// contenedor.deleteById(4);
// contenedor.deleteAll();

module.exports = Contenedor; 
