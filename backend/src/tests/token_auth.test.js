const supertest = require("supertest")
const app = require("../app")
const { sequelize } = require("../util/db")
const { User } = require("../models")
const { getLoggedInUser } = require("../controllers/authorisation")

const api = supertest(app)


beforeAll((done) => {
    app.on("dbReady", () => done())
})

beforeEach(async () => {
    await api.post("/api/users").send({
        username: "veikmaster",
        name: "Veikko",
        password: "yykaakoonee"
    })
})

afterEach(() => {
    User.destroy({ where: {}})
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