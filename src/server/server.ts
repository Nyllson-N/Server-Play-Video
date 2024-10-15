import express from 'express'
const server = express()

import 'dotenv/config'

// import { router } from './router/index'
import {router} from './router/index'
import cors from 'cors'
import path from 'path'
server.use(cors({origin: '*'}))
server.use('/video', express.static(path.join(__dirname, 'videos'), {
  maxAge: '1s'
}));

// server.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
//   next();
// })

server.use(express.json())
server.use(router)

export {server}