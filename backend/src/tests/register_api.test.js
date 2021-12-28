const supertest = require("supertest")
const app = require("../app")
const testUtils = require("./testUtils")
const signupCodeService = require("../util/signupCodeService")

const api = supertest(app)


beforeAll((done) => {
    app.on("dbReady", () => done())
})

beforeEach(async () => {
    
})

afterEach(async () => {
    await testUtils.clearUsers()
})

test("New user can register with code", async () => {
    const code = signupCodeService.createNew()

    const response = await api.post("/api/register")
        .send({ 
            username: "me",
            name: "veik",
            password: "123",
            code: code
        })
        .expect(200)

    expect(response.body.username).toBe("me")
})

test("Registration with invalid code fails", async () => {
    const code = { code: 123 }

    await api.post("/api/register")
        .send({ 
            username: "me",
            name: "veik",
            password: "123",
            code
        })
        .expect(401)
})

test("Cannot use code twice", async () => {
    const code = signupCodeService.createNew()

    await api.post("/api/register")
        .send({ 
            username: "me",
            name: "veik",
            password: "123",
            code: code
        })
        .expect(200)
    
    await api.post("/api/register")
        .send({ 
            username: "we",
            name: "veik",
            password: "123",
            code: code
        })
        .expect(401)
})

test("Registration fails if username taken", async () => {
    await api.post("/api/register")
        .send({ 
            username: "me",
            name: "veik",
            password: "123",
            code: signupCodeService.createNew()
        })
        .expect(200)
    
    await api.post("/api/register")
        .send({ 
            username: "me",
            name: "veik",
            password: "123",
            code: signupCodeService.createNew()
        })
        .expect(400)
})