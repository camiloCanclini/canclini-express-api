// IMPORTS

import express from 'express';
import handler from '../handlers/api.handler.js'


// OBJ

const router = express.Router()

// ROUTES

router.get('/products', handler.getProductsByFilter)

router.get('/products', handler.getProducts)

router.get('/product/:idProduct', handler.getProductById)


// MODULE EXPORT

export default router