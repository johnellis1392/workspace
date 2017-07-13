const Router = require('express').Router
const userRouter = require('./users')
const exampleRouter = require('./examples')

const router = new Router()
router.use(userRouter)
router.use(exampleRouter)

module.exports = router
