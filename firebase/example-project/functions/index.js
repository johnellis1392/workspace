const admin = require('firebase-admin')
const functions = require('firebase-functions')
const express = require('express')
const cookieParser = require('cookie-parser')()
const bodyParser = require('body-parser')
const cors = require('cors')({ origin: true })


// Initialize firebase app
admin.initializeApp(functions.config().firebase)

// Using express app as api gateway, from example:
// https://github.com/firebase/functions-samples/blob/master/authenticated-json-api/functions/index.js
const app = express()


// Hook for adding users to database
exports.createUser = functions.auth.user().onCreate((event) => {
    const user = event.data
    const { displayName, email, uid } = user

    return admin.database().ref(`/users/${uid}`).set({
        displayName,
        email
    })
})


const authenticate = (request, response, next) => {
    if (!request.headers.authorization || !request.headers.authorization.startsWith("Bearer ")) {
        response.status(403).send("Unauthorized")
        return
    }

    const idToken = request.headers.authorization.split("Bearer ")[1]
    return admin.auth().verifyIdToken(idToken).then((decodedIdToken) => {
        request.user = decodedIdToken
        return next()
    }).catch((error) => {
        return response.status(403).send("Unauthorized")
    })
}

app.use(cors)
app.use(cookieParser)
app.use(bodyParser.json())
app.use(authenticate)



app.get("/examples", (request, response) => {
    return Promise.try(() => {
        const { user } = request
        const userId = user.uid

        return firebase.database.ref(`/users/${userId}/examples`).once("value").then((data) => {
            response.json(data.toJSON())
            response.status(200)
        })

    }).catch((err) => {
        response.status(500)
        response.send(err)
    }).finally(() => {
        response.end()
    })
})


app.get("/hello", (request, response) => {
    return Promise.try(() => {
        response.send("Hello, World!")
        response.status(200)
    }).catch(() => {
        response.status(500)
    }).finally(() => {
        response.end()
    })
})


app.post("/users/:userId/examples", (request, response) => {
    return Promise.try(() => {
        const exampleData = request.body
        const { userId } = request.params

        return firebase.database.ref("/examples").push(exampleData).then((snapshot) => {
            const exampleId = Object.keys(snapshot.val())[0]
            return admin.database().ref(`/users/${userId}/examples/${exampleId}`).set(true)
        }).then(() => {
            response.status(200)
        })

    }).catch((err) => {
        response.send(err)
        response.status(500)
    }).finally(() => {
        response.end()
    })
})


exports.api = functions.https.onRequest((request, response) => {
    if (!request.path) {
        request.url = `/${request.url}`
    }

    return app(request, response)
})
