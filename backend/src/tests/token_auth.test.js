const supertest = require("supertest")
const app = require("../app")
const { sequelize } = require("../util/db")
const { User } = require("../models")
const { getLoggedInUser } = require("../middleware/authorization")
const testUtils = require("./testUtils")

const api = supertest(app)


beforeAll((done) => {
    app.on("dbReady", () => done())
})

beforeEach(async () => {
    await testUtils.createUser(api)
})

afterEach(async () => {
    await testUtils.clearUsers()
})

test("After login, requests are considered authorized", async () => {
    const loginResponse = await api.post("/api/login").send(
        { username: "veikmaster", password: "yykaakoonee" }
    )
    const token = loginResponse.body.token

    await api
        .get("/api/myprofile")
        .set("Authorization", "bearer " + token)
        .expect(200)
})