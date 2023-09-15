// IMPORTS

import express from "express"
import { configDotenv } from "dotenv"
import cors from 'cors'
import loginRouter from "./src/routes/login.router"

// APP CONFIG

configDotenv()

// MAIN OBJS

const env = process.env
const app = express()

// EXPRESS CONFIG

app.use(express.json())
app.use(cors())

// EXPRESS ROUTERS

app.use()


// INIT THE APP

const port = env.PORT
app.listen(port, () => console.log('The Application Is Running On Port: http://localhost:'+ port))