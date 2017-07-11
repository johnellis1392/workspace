const admin = require('firebase-admin')
const functions = require('firebase-functions')
const express = require('express')

admin.initializeApp(functions.config().firebase)

// Using express app as api gateway, from example:
// https://github.com/firebase/functions-samples/blob/master/authenticated-json-api/functions/index.js
const app = express()


const authenticate = (request, response, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
        response.status(403).send("Unauthorized")
        return
    }

    const idToken = req.headers.authorization.split("Bearer ")[1]
    admin.auth().verifyIdToken(idToken).then((decodedIdToken) => {
        request.user = decodedIdToken
        next()
    }).catch((error) => {
        console.error(error)
        res.status(403).send("Unauthorized")
    })
}

app.use(authenticate)

// TODO Finish express api


exports.createUser = functions.auth.user().onCreate((event) => {
    const user = event.data
    const { displayName, email, uid } = user
    admin.database().ref(`/users/${uid}`).set({
        displayName,
        email
    })
})


exports.createExample = functions.database.ref(`/users/{userId}/examples`).onCreate((event) => {
    console.log(` *** Starting createExample listener`)
    const { userId } = event.params
    const exampleData = event.data.val()
    const exampleId = Object.keys(exampleData)[0]
    const example = exampleData[exampleId]
    console.log(` *** Received create request for example '${exampleId}': ${JSON.stringify(example)}`)

    return Promise.all([
        admin.database().ref(`/examples/${exampleId}`).set(example),
        admin.database().ref(`/users/${userId}/examples/${exampleId}`).set(true)
    ]).then(() => {
        console.log(` *** Finished creating reference for example '${exampleId}'`)
    }).catch((err) => {
        console.error(` *** An error occurred while creating example '${exampleId}':\n${err}`)
    })
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!")
// })
