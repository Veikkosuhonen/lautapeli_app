const supertest = require("supertest")
const app = require("../app")
const { sequelize } = require("../util/db")
const { User } = require("../models")
const testUtils = require("./testUtils")

const api = supertest(app)


beforeAll((done) => {
    app.on("dbReady", async () => {
        await testUtils.register(api)
        done()
    })
})

beforeEach(async () => {
    await api.post("/api/users").send({
        username: "veikmaster",
        name: "Veikko",
        password: "yykaakoonee"
    })
    await testUtils.login(api)
})

afterEach(async () => {
    await testUtils.clearUsers()
})

test("Users are returned as json", async () => {
    await api
        .get("/api/users")
        .set("authorization", testUtils.getToken())
        .expect(200)
        .expect("Content-Type", /application\/json/)
})

test("Can create valid user and returns fields", async () => {
    const response = await api.post("/api/users")
        .set("authorization", testUtils.getToken())
        .send({
            username: "zyl",
            name: "Veikko",
            password: "yykaakoonee"
        }).expect(200)

    const body = response.body

    expect(body.username).toBe("zyl")
    expect(body.name).toBe("Veikko")
    expect(body.id).toBeDefined()
})

test("Can get one user", async () => {
    const user = await User.findOne()
    const response = await api
        .get("/api/users/" + user.id)
        .set("authorization", testUtils.getToken())
        .expect(200)
})