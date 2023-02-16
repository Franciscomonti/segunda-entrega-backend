import cartModel from "../models/carts.model.js";
import productModel from "../models/products.model.js";

export default {

    create: (cart) => {
        return new Promise(async (resolve, reject) => {
            try {
                const newCart = new cartModel();
                await newCart.save();
                resolve(newCart);
                return
            } catch (error) {
                reject(error)
            }
        })
    },

    addProductToCart: (cartId, productId) => {
        return new Promise(async (resolve, reject) => {
            try {

                const existProduct = await productModel.findOne({
                    _id: productId
                });

                if (existProduct) {

                    const myProduct = {
                        _id: productId,
                        quantity: 1,
                    };

                    const cart = await cartModel.findOne({
                        _id: cartId
                    });

                    if (cart.products.length === 0) {
                        cart.products.push(myProduct);
                        const resultSave = await cartModel.findByIdAndUpdate(cartId, {
                            products: cart.products,
                        });
                        resolve('product added successfully', resultSave);

                    } else {
                        const index = cart.products.findIndex(
                            (product) => product._id === myProduct._id
                        );
                        if (index === -1) {
                            cart.products.push(myProduct);
                            const resultSave = await cartModel.findByIdAndUpdate(cartId, {
                                products: cart.products,
                            });
                            resolve('product added successfully', resultSave);

                        } else {
                            cart.products[index].quantity += 1;
                            const resultSave = await cartModel.findByIdAndUpdate(cartId, {
                                products: cart.products,
                            });
                            resolve('product added successfully', resultSave);
                        }
                    }
                }

                resolve('product id is not available')


            } catch (error) {
                reject(error)
            }
        })
    },

    deleteCart: (cartId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const deletedCart = await cartModel.findByIdAndDelete(cartId);
                resolve('cart deleted successfully', deletedCart)
            } catch (error) {
                reject(error)
            }

        })
    }

}