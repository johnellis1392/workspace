const admin = require('firebase-admin')
const express = require('express')
const cookieParser = require('cookie-parser')()
const bodyParser = require('body-parser')
const cors = require('cors')

const routes = require('./routes')
const app = express()

app.use(cors({ origin: true }))
app.use(cookieParser)
app.use(bodyParser.json())


// Authentication middleware
app.use((request, response, next) => {
    if (!request.headers.authorization || !request.headers.authorization.startsWith("Bearer ")) {
        console.error(" *** Inavlid authorization token:\n", request.headers.authorization)
        console.error("\n *** Headers:\n", request.header)
        response.status(403).send("Unauthorized")
        return
    }

    const idToken = request.headers.authorization.split("Bearer ")[1]
    return admin.auth().verifyIdToken(idToken).then((decodedIdToken) => {
        request.user = decodedIdToken
        return next()
    }).catch((err) => {
        console.error(" *** An error occurred:\n", err)
        return response.status(403).send(err)
    })
})


app.get("/profile", (request, response) => {
    const { user } = request
    const userId = user.uid

    return admin.database().ref(`/users/${userId}`).once("value").then((snapshot) => {
        let userData = snapshot.val()
        if (!userData) {
            response.status(404).send("Not Found")
        } else {
            userData = Object.assign({}, userData, { uid: userId })
            response.status(200).json(userData)
        }
    }).catch((err) => {
        console.error(" *** Unhandled error occurred in '/users/:userId':\n", err)
        response.status(500).send(err)
    })
})


app.get("/hello", (request, response) => {
    return new Promise((resolve, reject) => {
        response.status(200).send("Hello, World!")
        resolve()
    }).catch(() => {
        response.status(500)
    })
})


app.use("/", routes)

module.exports = app
