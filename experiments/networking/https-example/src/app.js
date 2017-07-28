import Koa from 'koa'
import Router from 'koa-router'
import logger from 'koa-logger'
import path from 'path'
const app = new Koa()
app.use(logger())

app.use((context, next) => {
    // console.log(context.request.secure)
    return next()
})

const router = new Router({ prefix: "/" })
router.get("/", (context) => {
    context.body = "Hello, World!"
})
app.use(router.routes())

export default app
