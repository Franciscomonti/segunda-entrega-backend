const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

module.exports = {

    create: (cart) => {
        return new Promise ((resolve, reject) => {
            try {
                let carts = JSON.parse(fs.readFileSync('./data/cart.json'));
                cart.id = uuidv4()

                fs.writeFileSync('./data/cart.json', JSON.stringify([...carts, cart], null, 2))
                resolve(cart)
            }catch (error) {
                reject(error)
            }
        })       
    },

    addProductToCart: (cartId, productId) => {
        return new Promise((resolve, reject) => {
            try{
                let carts = JSON.parse(fs.readFileSync('./data/cart.json'));
                let products = JSON.parse(fs.readFileSync('./data/product.json'));

                let cartSelected = carts.find(cart => cart.id === cartId)
                let productSelected = products.find(product => product.id === productId)

                let isInCart = cartSelected.products.find(product => product.id === productId)

                if(isInCart){
                    isInCart.quantity ++ 
                    console.log('esta en el carrito')
                }else{

                    let productToAdd = {"id" : productSelected.id, "quantity" : 1}

                    cartSelected.products.push(productToAdd)
                }

                fs.writeFileSync(`./data/cart.json`, JSON.stringify(carts, null, 2))
                
                resolve(productSelected, cartId)

            }catch (error) {
                reject(error)
            }
        })
    },

    getAllProducts: (cartId) => {
        return new Promise((resolve, reject) => {
            try {
                let carts = JSON.parse(fs.readFileSync('./data/cart.json'));
                let cartSelected = carts.find(cart => cart.id === cartId)

                resolve(cartSelected.products)

            }catch (error) {
                reject(error)
            }

    })
    }


}