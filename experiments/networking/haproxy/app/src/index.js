import Koa from 'koa'
import http from 'http'

const { SERVER_NAME, PORT } = process.env
const app = new Koa()
app.use((context) => {
    context.body = `Hello, from ${SERVER_NAME}!\n`
})

http.createServer(app.callback()).listen(PORT)
console.log(`App '${SERVER_NAME}' listening on port: ${PORT}`)
