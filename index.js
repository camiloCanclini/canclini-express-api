// IMPORTS

import express from "express"
import { configDotenv } from "dotenv"
import cors from 'cors'
import productRouter from "./src/routes/api.router.js"
import commonHandler from './src/handlers/common.handler.js'

// APP CONFIG

configDotenv()

// MAIN OBJS

// eslint-disable-next-line no-undef
const env = process.env
const app = express()

// EXPRESS CONFIG

app.use(express.json())
app.use(cors())

// EXPRESS ROUTERS

app.use(productRouter)

app.use(commonHandler.notFoundHandler)

// INIT THE APP

const port = env.PORT || 3000
app.listen(port, () => console.log('The Application Is Running On Port: http://localhost:'+ port))