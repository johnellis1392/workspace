const admin = require('firebase-admin')
const functions = require('firebase-functions')
const express = require('express')
const cookieParser = require('cookie-parser')()
const bodyParser = require('body-parser')
const cors = require('cors')


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
}

app.use(cors({ origin: true }))
app.use(cookieParser)
app.use(bodyParser.json())
app.use(authenticate)


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


app.get("/examples", (request, response) => {
    const { user } = request
    const userId = request.params.userId || user.uid

    // Disallow users from viewing other users' data
    if (userId !== user.uid) {
        return response.status(404).send("Not Found")
    }

    return admin.database().ref(`/users/${userId}/examples`).once("value").then((snapshot) => {
        response.status(200).json(snapshot.val())
    }).catch((err) => {
        console.error(" *** Unhandled error occurred in '/examples':\n", err)
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


app.get("/users/:userId/examples", (request, response) => {
    const { userId } = request.params
    const { user } = request
    if (userId !== user.uid) {
        return response.status(400).end()
    }

    return admin.database().ref(`/users/${userId}/examples`).once("value").then((examplesSnapshot) => {
        const keys = Object.keys(examplesSnapshot.val())
        return Promise.all(keys.map((exampleId) => {
            return admin.database().ref(`/examples/${exampleId}`).once("value").then((snapshot) => {
                return Object.assign({}, snapshot.val(), { exampleId })
            })
        }))
    }).then((examples) => {
        response.status(200).json(examples)
    }).catch((err) => {
        console.error(" *** An error occurred while processing GET /users/:userId/examples:\n", err)
        response.status(500).end()
    })
})


// TODO Add validator middleware to users endpoint to validate
// that users are not performing illegal operations with other
// users' accounts
app.post("/users/:userId/examples", (request, response) => {
    // TODO Add validator for example data? Maybe rely on db rules?
    const { userId } = request.params
    const { user } = request
    const exampleData = Object.assign({}, request.body, { userId })

    if (!request.body || userId !== user.uid) {
        return response.status(400).end()
    }

    return admin.database().ref("/examples").push(exampleData).then((ref) => {
        // ref.key is the id of the new example object
        const exampleId = ref.key
        return admin.database().ref(`/users/${userId}/examples/${exampleId}`).set(true)
    }).then(() => {
        response.status(200).json(exampleData)
    }).catch((err) => {
        console.error(" *** An error occurred while processing POST /users/:userId/examples:\n", err)
        response.status(500).send(err)
    })
})


exports.api = functions.https.onRequest((request, response) => {
    if (!request.path) {
        request.url = `/${request.url}`
    }

    return app(request, response)
})
