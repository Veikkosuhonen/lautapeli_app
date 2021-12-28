const supertest = require("supertest")
const app = require("../app")
const { User } = require("../models")
const testUtils = require("./testUtils")
const { ADMIN_USER, ADMIN_PASSWORD } = require("../util/config")
const signupCodeService = require("../util/signupCodeService")

const api = supertest(app)

beforeAll((done) => {
    app.on("dbReady", () => done())
})

afterEach(() => {
    //signupCodeService.codes = []
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

test("Can create codes", async () => {

    await testUtils.login(api, ADMIN_USER, ADMIN_PASSWORD)
    let response = await api.get("/api/admin/codes")
        .set("Authorization", testUtils.getToken())
        .expect(200)
    expect(response.body).toHaveLength(0)

    response = await api.post("/api/admin/codes")
        .set("Authorization", testUtils.getToken())
        .expect(200)
    expect(response.body.code).toBeDefined()

    expect(signupCodeService.codes).toHaveLength(1)

    const codesResponse = await api.get("/api/admin/codes")
        .set("Authorization", testUtils.getToken())
        .expect(200)
    expect(codesResponse.body).toHaveLength(1)
    expect(codesResponse.body.some(code => code.code === response.body.code))

    signupCodeService.codes = []
})