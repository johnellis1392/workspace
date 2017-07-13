const admin = require('firebase-admin')
const functions = require('firebase-functions')

// Initialize firebase app;
// Make sure to initialize firebase first, so other app
// components have access to database
admin.initializeApp(functions.config().firebase)


// Using express app as api gateway, from example:
// https://github.com/firebase/functions-samples/blob/master/authenticated-json-api/functions/index.js
const app = require('./src/app')


// Hook for adding users to database
exports.createUser = functions.auth.user().onCreate((event) => {
    const user = event.data
    const { displayName, email, uid } = user

    return admin.database().ref(`/users/${uid}`).set({
        displayName,
        email
    })
})


exports.api = functions.https.onRequest((request, response) => {
    if (!request.path) {
        request.url = `/${request.url}`
    }

    return app(request, response)
})
