const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp(functions.config().firebase)


exports.createUser = functions.auth.user().onCreate((event) => {
    const user = event.data
    const { displayName, email, uid } = user
    admin.database().ref(`/users/${uid}`).set({
        displayName,
        email
    })
})

exports.createExample = functions.database.ref(`/users/{userId}/examples`).onCreate((event) => {
    const { userId } = event.params
    const example = event.data
    const exampleId = example.uid
    admin.database().ref(`/examples/${exampleId}`).set(example)
    admin.database().ref(`/users/${userId}/examples/${uid}`).set(true)
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!")
// })
