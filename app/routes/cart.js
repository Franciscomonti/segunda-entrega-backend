import controller from '../controller/cart.js';
import {Router} from 'express';

const router = Router();

router.post('/', controller.create)

router.post('/:cId/:pId', controller.addProductToCart)

router.get('/:cId' , controller.getAllProducts)

export default router;