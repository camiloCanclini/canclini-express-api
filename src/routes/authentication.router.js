// IMPORTS

import express from 'express';
import handler from '../handlers/authentication.handler.js'

// OBJ

const router = express.Router()

// ROUTES

router.post('/register', handler.registerUser)

router.post('/login', handler.loginUser)

router.use(handler.checkAuthHandler)


// MODULE EXPORT

export default router