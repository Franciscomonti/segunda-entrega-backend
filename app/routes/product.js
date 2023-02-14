const express = require('express');
const controller = require('../controller/product.js');
const router = express.Router();

router.get('/', controller.getAllProducts)

router.get('/:id', controller.getProductById)

router.post('/', controller.create)

router.put('/:id', controller.updateProduct)

router.delete('/:id', controller.deleteProduct)

module.exports = router;