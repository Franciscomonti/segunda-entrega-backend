import productModel from '../models/products.model.js';

export default {

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
            try{
                const product = await productModel.findByIdAndUpdate(id, dataToUpdate);
                resolve(product)
            }catch (error) {
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