// IMPORTS

import express from "express"
import bodyParser from "body-parser"
import { configDotenv } from "dotenv"
import cors from 'cors'
import productRouter from "./src/routes/api.router.js"
import authenticationRouter from "./src/routes/authentication.router.js"
import commonHandler from './src/handlers/common.handler.js'
//import authHandler from "./src/handlers/authentication.handler.js"

// APP CONFIG

configDotenv()

// MAIN OBJS

// eslint-disable-next-line no-undef
const env = process.env
const app = express()

// EXPRESS CONFIG

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

// EXPRESS ROUTERS
app.use(authenticationRouter)

//app.use(authHandler.notAuthHandler)

app.use(productRouter)

app.use(commonHandler.errorHandler)

app.use(commonHandler.notFoundHandler)

// INIT THE APP

const port = env.PORT || 3000
app.listen(port, () => console.log('The Application Is Running On Port: http://localhost:'+ port))