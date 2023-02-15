import express from 'express';
import {Router} from 'express';
import controller from '../controller/product.js';

const router = Router()

// const express = require('express');
// const router = express.Router();

router.get('/', controller.getAllProducts)

router.get('/:id', controller.getProductById)

router.post('/', controller.create)

router.put('/:id', controller.updateProduct)

router.delete('/:id', controller.deleteProduct)

export default router;