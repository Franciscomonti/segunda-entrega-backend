import cartModel from "../models/carts.model.js";

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

    addProductToCart: async (cartId, productId) => {

        const myProduct = {
            _id: productId,
            quantity: 1,
        };
        try {
            const result = await cartModel.find({
                _id: cartId
            });
            console.log(result[0]);

            if (result[0].products.length === 0) {
                result[0].products.push(myProduct);
                const resultSave = await cartModel.findByIdAndUpdate(cartId, {
                    products: result[0].products,
                });
                return resultSave;

            } else {
                const index = result[0].products.findIndex(
                    (product) => product._id === myProduct._id
                );
                if (index === -1) {
                    result[0].products.push(myProduct);
                    const resultSave = await cartModel.findByIdAndUpdate(cartId, {
                        products: result[0].products,
                    });
                    return resultSave;
                } else {
                    result[0].products[index].quantity += 1;
                    const resultSave = await cartModel.findByIdAndUpdate(cartId, {
                        products: result[0].products,
                    });
                    return resultSave;
                }
            }
        } catch (error) {
            reject(error)
        }
    }

}