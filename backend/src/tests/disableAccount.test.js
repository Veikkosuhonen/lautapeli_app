const supertest = require("supertest")
const app = require("../app")
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
    await testUtils.createUser(api, "me", "hacker", "hacks")
})

afterEach(async () => {
    await testUtils.clearUsers()
})

test("Admin can disable", async () => {
    await testUtils.login(api, ADMIN_USER, ADMIN_PASSWORD)
    const userToDisable = await User.findOne({ where: { username: "me" }})
    const response = await api.put("/api/users/" + userToDisable.id)
        .send({ disabled: true })
        .set("Authorization", testUtils.getToken())
        .expect(200)
    expect(response.body.username).toBe(userToDisable.username)
    expect(response.body.disabled).toBe(true)

    const theDisabledUser = await User.findOne({ where: { username: "me" }})
    expect(theDisabledUser.disabled).toBe(true)
})

test("Disabled user cannot authorize", async () => {
    let response = await testUtils.login(api, "me", "hacks")
    expect(response.statusCode).toBe(200)
    const token = response.body.token

    await testUtils.login(api, ADMIN_USER, ADMIN_PASSWORD)
    const userToDisable = await User.findOne({ where: { username: "me" }})
    await api.put("/api/users/" + userToDisable.id)
        .send({ disabled: true })
        .set("Authorization", testUtils.getToken())
        .expect(200)

    response = await testUtils.login(api, "me", "hacks")
    expect(response.statusCode).toBe(401)
    expect(response.body.error).toBe("account disabled")

    response = await api.get("/api/boardgames")
        .set("Authorization", "bearer " + token)
        .expect(401)
    expect(response.body.error).toBe("account disabled")
})