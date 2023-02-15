import service from '../mongodb/cart.js'

class Cart {
    constructor(id) {
        this.id = id
        this.products = []
    }
}

export default {

    create : (req, res) => {
        const newCart = new Cart();
        service
            .create(newCart)
            .then(newCart => res.status(200).json({'Cart created': newCart}))
            .catch(err => res.status(500).json({
                error: err.message
            }))
    },

    addProductToCart : (req, res) => {
        let cartId= req.params.cId;
        let productId = req.params.pId

        service
            .addProductToCart(cartId, productId)
            .then((product, cart) =>res.status(200).json({'Product added': product , 'to cart id': cart}))
            .catch(err => res.status(500).json({
                error: err.message
            }))
    },

    getAllProducts : (req, res) => {
        let cartId= req.params.cId;

        service
            .getAllProducts(cartId)
            .then((products) => res.status(200).json({'cart products' : products}))
            .catch(err => res.status(500).json({
                error: err.message
            }))

    }
}