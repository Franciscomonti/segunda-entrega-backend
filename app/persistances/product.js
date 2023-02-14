const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

module.exports = {

    save: (product) => {
        return new Promise((resolve, reject) => {
            try {
                let productsList = JSON.parse(fs.readFileSync(`./data/product.json`));

                if (productsList.find((item) => item.code === product.code)) {
                    resolve('Product code already exists')
                } else if (
                    !!!product.title ||
                    !!!product.price ||
                    !!!product.code ||
                    !!!product.description ||
                    !!!product.stock
                ) {
                    resolve('some data is required') 
                } else {
                    product.id = uuidv4()
                    fs.writeFileSync(`./data/product.json`, JSON.stringify([...productsList, product], null, 2))
                    resolve(product)
                }
            } catch (error) {
                reject(error);
            }
        })
    },

    getAll: () => {
        return new Promise((resolve, reject) => {
            try {
                const data = JSON.parse(fs.readFileSync(`./data/product.json`));
                resolve(data)
            } catch (error) {
                reject(error);
            }
        })
    },

    getProductById: (id) => {
        return new Promise((resolve, reject) => {
            try {
                let productsList = JSON.parse(fs.readFileSync(`./data/product.json`));
                let productToGet = productsList.find(product => product.id === id);
                resolve(productToGet);
            } catch (error) {
                reject(error);
            }
        })
    },

    update: (id, dataToUpdate) => {
        return new Promise((resolve, reject) => {
            try {
                let productsList = JSON.parse(fs.readFileSync(`./data/product.json`));
                let prodToUpdate = productsList.find((product) => product.id === id);

                if (prodToUpdate) {
                    const indexProductToUpdate = productsList.findIndex((product) => product.id === prodToUpdate.id);
                    productsList[indexProductToUpdate] = {
                        ...productsList[indexProductToUpdate],
                        ...dataToUpdate
                    };
                    fs.writeFileSync(`./data/product.json`, JSON.stringify(productsList, null, 2))
                    resolve(productsList[indexProductToUpdate])

                }
                resolve("The id of the product to update is not found");

            } catch (error) {
                reject(error);
            }
        })
    },

    deleted: (id) => {
        return new Promise((resolve, reject) => {
            try {
                let productsList = JSON.parse(fs.readFileSync(`./data/product.json`));
                let productToDeleted = productsList.find((product) => product.id === id)
                if (productToDeleted) {
                    let products = productsList.filter((product) => product.id !== id);
                    let dataString = JSON.stringify(products);
                    fs.writeFileSync(`./data/product.json`, dataString);
                    resolve(productToDeleted);
                }
                resolve('product id not found');
            }catch (error) {
                reject(error);
            }

        })


    }



}