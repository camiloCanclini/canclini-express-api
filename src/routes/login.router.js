// IMPORTS

import express from 'express';
import handlers from '../handlers/login.handlers'

// OBJ
const express = require('express');
const router = express.Router()


// ROUTES

router.get('/', login)

router.post('/login', userHandler.login)

router.get('/logout', userHandler.logout)

// MODULE EXPORT

export default router