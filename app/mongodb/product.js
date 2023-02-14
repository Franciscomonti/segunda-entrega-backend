const fs = require('fs');

const mongoose = require("mongoose");

const productCollection = 'products';

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: String,
    price: Number,
    stock: Number,
    category: String,
    thumbnails: String,
})

const productModel = mongoose.model(productCollection, productSchema);

module.exports = {

    save: (product) => {
        return new Promise(async (resolve, reject) => {
            try {

                if (
                    !!!product.title ||
                    !!!product.price ||
                    !!!product.code ||
                    !!!product.description ||
                    !!!product.stock
                ){
                    resolve('some data is required')
                    return;
                }

                let exists = await productModel.findOne({
                    code: product.code
                })

                if (exists) {
                    resolve('Product already exists')
                    return;
                }

                let newProduct = new productModel({
                    title: product.title,
                    description: product.description,
                    code: product.code,
                    price: product.price,
                    stock: product.stock,
                    category: product.category,
                    thumbnails: product.thumbnails,
                })
                
                let saved = await newProduct.save(product)
                product.id = saved.id
                resolve(product)
                return;

            } catch (error) {
                reject(error);
            }
        })
    },

    getAll: () => {
        return new Promise(async (resolve, reject) => {
            try {
                let products = await productModel.find()
                if (products.length == 0) {
                    resolve('The list of products is empty')
                    return;
                }
                resolve(products)
                return;
            } catch (error) {
                reject(error);
            }
        })
    },

    getProductById: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let productToGet = await productModel.findById(id)
                if (!productToGet) {
                    resolve(`The product with id ${id} is not available`)
                    return;
                }
                resolve(productToGet);
                return;
            } catch (error) {
                reject(error);
            }
        })
    },


    update: (id, dataToUpdate) => {
        return new Promise(async (resolve, reject) => {
            try {
                let productToUpdate = await productModel.findById(id)
                if (productToUpdate) {
                    const indexProductToUpdate = productsList.findIndex((product) => product.id === prodToUpdate.id);
                    productsList[indexProductToUpdate] = {
                        ...productsList[indexProductToUpdate],
                        ...dataToUpdate
                    };
                    fs.writeFileSync(`./data/product.json`, JSON.stringify(productsList, null, 2))
                    resolve(productsList[indexProductToUpdate])
                }
                resolve("The id of the product is not available");
            } catch (error) {
                reject(error);
            }
        })
    },


    deleted: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let productToDeleted = await productModel.findByIdAndDelete(id)
                if (!productToDeleted) {
                    resolve('the product to delete was not found')
                }
                resolve(productToDeleted);
            } catch (error) {
                reject(error);
            }
        })
    }
}