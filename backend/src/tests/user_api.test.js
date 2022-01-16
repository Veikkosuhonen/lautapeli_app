const supertest = require("supertest")
const app = require("../app")
const { sequelize } = require("../util/db")
const { User } = require("../models")
const testUtils = require("./testUtils")
const { ADMIN_USER, ADMIN_PASSWORD } = require("../util/config")

const api = supertest(app)


beforeAll((done) => {
    app.on("dbReady", async () => {
        done()
    })
})

beforeEach(async () => {
    await testUtils.createUser(api)
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

test("Admin can create valid user and returns fields", async () => {
    await testUtils.login(api, ADMIN_USER, ADMIN_PASSWORD)
    const response = await api.post("/api/users")
        .set("authorization", testUtils.getToken())
        .send({
            username: "zyl543",
            name: "Veikko123",
            password: "yykaakoonee"
        }).expect(200)

    const body = response.body

    expect(body.username).toBe("zyl543")
    expect(body.name).toBe("Veikko123")
    expect(body.id).toBeDefined()
})

test("Can get one user", async () => {
    const user = await User.findOne()
    const response = await api
        .get("/api/users/" + user.id)
        .set("authorization", testUtils.getToken())
        .expect(200)
})