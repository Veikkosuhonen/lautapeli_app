const supertest = require("supertest")
const app = require("../app")
const { sequelize, connectToDatabase } = require("../util/db")
const { User } = require("../models")

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

afterEach(async () => {
    await User.destroy({ where: {} })
})

test("Existing user can log in", async () => {
    const response = await api.post("/api/login").send({
        username: "veikmaster",
        password: "yykaakoonee"
    }).expect(200)

    expect(response.body.token).toBeDefined()
})

test("Nonexisting user cannot log in", async () => {
    const response = await api.post("/api/login").send({
        username: "vaikmaster",
        password: "yykaakoonee"
    }).expect(401)

    expect(response.body.error).toBeDefined()
    expect(response.body.token).toBeUndefined()
})

test("Cannot log in with wrong password", async () => {
    const response = await api.post("/api/login").send({
        username: "veikmaster",
        password: "yksaakoonee"
    }).expect(401)

    expect(response.body.error).toBeDefined()
    expect(response.body.token).toBeUndefined()
})