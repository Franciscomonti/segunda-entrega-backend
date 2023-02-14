const express = require('express');
const controller = require('../controller/cart.js');
const router = express.Router();

router.post('/', controller.create)

router.post('/:cId/:pId', controller.addProductToCart)

router.get('/:cId' , controller.getAllProducts)

module.exports = router;