const supertest = require("supertest")
const app = require("../app")
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

test("Existing user can log in", async () => {
    const response = await testUtils.login(api)

    expect(response.statusCode).toBe(200)
    expect(response.body.token).toBeDefined()
})

test("Nonexisting user cannot log in", async () => {
    const response = await api.post("/api/login").send({
        username: "vaikmaster",
        password: "yykaakoonee"
    })

    expect(response.statusCode).toBe(401)
    expect(response.body.error).toBeDefined()
    expect(response.body.token).toBeUndefined()
})

test("Cannot log in with wrong password", async () => {
    const response = await api.post("/api/login").send({
        username: "veikmaster",
        password: "yykaakooneevii"
    })

    expect(response.statusCode).toBe(401)
    expect(response.body.error).toBeDefined()
    expect(response.body.token).toBeUndefined()
})