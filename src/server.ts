import 'dotenv/config'

import Koa from 'koa'
import cors from 'koa2-cors'
import KoaBody from 'koa-body'

import { DB_Initialize } from './db'
import router from './router'

DB_Initialize().then(() => {
  const server = new Koa()

  server.use(cors())
  server.use(KoaBody())

  server.use(router.routes()).use(router.allowedMethods())
  
  const PORT = Number(process.env.PORT)
  server.listen(PORT, () => {
    console.log(`server started at ${PORT}`)
  })
})
.catch(err => console.log(err))