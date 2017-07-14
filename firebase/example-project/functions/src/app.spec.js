const chai = require('chai')
const sinon = require('sinon')
const supertest = require('supertest')
const app = require('./app')
const agent = supertest.agent(app)

describe("GET /profile", () => {

    it("should return a user's profile information")

})
