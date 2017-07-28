import tls from 'tls'
import https from 'https'
import path from 'path'
import fs from 'fs'
import app from './app'

// ENV Configs
const PORT = process.env.PORT
const CERT_DIR = process.env.CERT_DIR


const KEY = path.resolve(CERT_DIR, "server.key")
const CERT = path.resolve(CERT_DIR, "server.crt")
const options = {
    key: fs.readFileSync(KEY).toString(),
    cert: fs.readFileSync(CERT).toString()
}

// Example HTTPS Server
https.createServer(options, app.callback()).listen(PORT)
// https.createServer(app.callback()).listen(PORT)

// Example get request
// setTimeout(() => {
//     const options = {
//         hostname: "localhost",
//         port: 3000,
//         path: "/",
//         method: "GET",
//         key: fs.readFileSync(KEY).toString(),
//         cert: fs.readFileSync(CERT).toString(),
//         rejectUnathorized: false,
//         requestCert: true,
//         // agent: false,
//     }
//
//     // console.log(" *** Making request...")
//     // https.request(options, (res) => {
//     //     console.log("Status code: ", res.statusCode)
//     //
//     //     res.on("data", (data) => {
//     //         console.log(data)
//     //     })
//     // })
// }, 1000)


// Example TLS Server
// tls.createServer(options, app.callback()).listen(PORT)

// Example TLS client
// const _options = {
//     key: fs.readFileSync(KEY).toString(),
//     cert: fs.readFileSync(CERT).toString(),
// }
//
// const client = tls.connect(PORT, _options, () => {
//     console.log(client.authorized)
// })
//
// client.on("data", (data) => {
//     console.log(data)
//     client.end()
// })

console.log("Api listening on port: ", PORT)
