import express, { Router } from 'express'
import dotenvFlow from 'dotenv-flow'
import cors from 'cors'
import { routes } from './routes.js'

dotenvFlow.config()
const app = express()
const router = Router()

app.use(cors())

app.use('/api', routes(router))

app.listen(process.env.API_PORT, async () => {
  console.log('Listening on port: ', process.env.API_PORT)
})
