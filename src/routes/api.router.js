// IMPORTS

import express from 'express';
import handler from '../handlers/api.handlers.js'

// OBJ

const router = express.Router()

// ROUTES

router.get('/products', handler.getProductsByFilter)

router.get('/products', handler.getProducts)

//router.get('/product/{idProduct}', handler.getProductById)

// eslint-disable-next-line no-unused-vars
router.use(handler.errorHandler)

// MODULE EXPORT

export default router