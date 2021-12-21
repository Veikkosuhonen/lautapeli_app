const supertest = require("supertest")
const app = require("../app")
const { sequelize } = require("../util/db")
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

afterEach(() => {
    User.destroy({ where: {}})
})

test("Users are returned as json", async () => {
    await api
        .get("/api/users")
        .expect(200)
        .expect("Content-Type", /application\/json/)
})

test("Can create valid user and returns fields", async () => {
    const response = await api.post("/api/users").send({
        username: "zyl",
        name: "Veikko",
        password: "yykaakoonee"
    }).expect(200)

    const body = response.body

    expect(body.username).toBe("zyl")
    expect(body.name).toBe("Veikko")
    expect(body.passwordHash).toBeDefined()
    expect(body.id).toBeDefined()
})

test("Can get one user", async () => {
    const user = await User.findOne()
    const response = await api.get("/api/users/" + user.id)
        .expect(200)
})