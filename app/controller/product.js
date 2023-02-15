import persistance from '../mongodb/product.js'

class Product {
    constructor(id, title, description, code, price, stock, category, thumbnails)
    {
        this.id = id
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails;
    }
}

export default {

    create: (req, res) => {
        const data = req.body
        const newProduct = new Product(data.id, data.title, data.description, data.code, data.price, data.stock, data.category, data.thumbnails)
        
        persistance
            .save(newProduct)
            .then(newProduct => res.status(200).json({'Product created': newProduct}))
            .catch(err => res.status(500).json({error: err.message}))
    },

    getAllProducts: (req, res) =>{
        persistance
            .getAll()
            .then(data => res.status(200).json({'All prodcuts' : data}))
            .catch(err => res.status(500).json({error: err.message}))
    },

    getProductById: (req, res) => {
        let id = req.params.id

        persistance
            .getProductById(id)
            .then(productToGet => res.status(200).json({'product': productToGet}))
            .catch(err => res.status(500).json({error: err.message}))
    },

    updateProduct: (req, res) => {
        let id = req.params.id
        const {
            title,
            description,
            code,
            price,
            thumbnail,
            stock,
            category,
            
        } = req.body;

        persistance
            .update(id, {
                title,
                description,
                code,
                price,
                thumbnail,
                stock,
                category,
                
            })
            .then(productUpdate => res.status(200).json({'product update correct': productUpdate}))
            .catch(err => res.status(500).json({err: err.message}))
    },

    deleteProduct: (req, res) => {
        let id = req.params.id

        persistance
            .deleted(id)
            .then(productToDeleted => res.status(200).json({'product deleted': productToDeleted}))
            .catch(err => res.status(500).json({err: err.message}))

    }
    

}