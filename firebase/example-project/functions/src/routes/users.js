const admin = require('firebase-admin')
const Router = require('express').Router
const router = new Router()


router.get("/users/:userId/examples", (request, response) => {
    console.log(" *** GET /users/:userId/examples")

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
router.post("/users/:userId/examples", (request, response) => {
    // TODO Add validator for example data? Maybe rely on db rules?
    console.log(" *** POST /users/:userId/exapmles")

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


module.exports = router
