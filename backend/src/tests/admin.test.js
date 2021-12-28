const supertest = require("supertest")
const app = require("../app")
const { User } = require("../models")
const testUtils = require("./testUtils")
const { ADMIN_USER, ADMIN_PASSWORD } = require("../util/config")

const api = supertest(app)

beforeAll((done) => {
    app.on("dbReady", () => done())
})

test("Can login as admin", async () => {
    const response = await api.post("/api/login")
        .send({ username: ADMIN_USER, password: ADMIN_PASSWORD })
        .expect(200)
    
    expect(response.body.isAdmin).toBeTruthy()
})

test("Admin auth works", async () => {
    await testUtils.login(api, ADMIN_USER, ADMIN_PASSWORD)
    const response = await api.get("/api/admin")
        .set("Authorization", testUtils.getToken())
        .expect(200)
})