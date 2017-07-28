import Koa from 'koa'
import logger from 'koa-logger'

const PORT = process.env.PORT || 3000
const NAME = process.env.SERVER_NAME
const app = new Koa()
app.use(logger())
app.use((context) => {
    context.status = 200
    context.body = `Hello, from ${NAME}`
})

app.listen(PORT, () => {
    console.log("App listening on port: ", PORT)
})
