const admin = require('firebase-admin')
const Router = require('express').Router
const router = new Router()

router.get("/examples", (request, response) => {
    console.log(" *** GET /examples")
    const { user } = request
    const userId = request.params.userId || user.uid

    // Disallow users from viewing other users' data
    if (userId !== user.uid) {
        return response.status(400).end()
    }

    return admin.database().ref(`/users/${userId}/examples`).once("value").then((examples) => {
        const keys = Object.keys(examples.val())
        return Promise.all(keys.map((exampleId) => {
            return admin.database().ref(`/examples/${exampleId}`).once("value").then((example) => {
                return Object.assign({}, example.val(), { exampleId })
            })
        }))
    }).then((examples) => {
        response.status(200).json(examples)
    }).catch((err) => {
        console.error(" *** Unhandled error occurred in '/examples':\n", err)
        response.status(500).send(err)
    })
})

module.exports = router
