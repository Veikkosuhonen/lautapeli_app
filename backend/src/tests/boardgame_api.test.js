const supertest = require("supertest")
const app = require("../app")
const { sequelize, connectToDatabase } = require("../util/db")
const { Boardgame } = require("../models")
const testUtils = require("./testUtils")

const api = supertest(app)


beforeAll((done) => {
    app.on("dbReady", async () => { 
        await testUtils.register(api)
        done()
    })
})

beforeEach(async () => {
    await Boardgame.create({ name: "Shogun" })
    await testUtils.login(api)
})

afterEach(async () => {
    await Boardgame.destroy({ where: { } })
})

test("Boardgames are returned as json", async () => {
    await api
        .get("/api/boardgames")
        .expect(200)
        .expect("Content-Type", /application\/json/)
})

test("Response contains one object", async () => {
    const response = await api.get("/api/boardgames")
    expect(response.body).toHaveLength(1)
})

test("Post must be authorized", async () => {
    const newBg = { name: "Everdell" }
    const response = await api
        .post("/api/boardgames")
        .send(newBg)
        .expect(401)
})

test("Put must be authorized", async () => {
    const newBg = { name: "Everdell" }
    const response = await api
        .put("/api/boardgames/123")
        .send(newBg)
        .expect(401)
})

test("Valid boardgame can be posted", async () => {
    const newBg = { name: "Everdell" }
    const response = await api
        .post("/api/boardgames")
        .set("authorization", testUtils.getToken())
        .send(newBg)
        .expect(200)
        .expect("Content-Type", /application\/json/)
})

test("Invalid boardgame returns bad request", async () => {
    const newBg = { title: "Everdell" }
    const response = await api
        .post("/api/boardgames")
        .set("authorization", testUtils.getToken())
        .send(newBg)
        .expect(405)
})

test("Posted boardgame is added", async () => {
    await api
        .post("/api/boardgames")
        .set("authorization", testUtils.getToken())
        .send({ name: "Azul" })
    const response = await api.get("/api/boardgames")
    expect(response.body).toHaveLength(2)
})

test("Can get posted boardgame", async () => {
    const postResponse = await api
        .post("/api/boardgames")
        .set("authorization", testUtils.getToken())
        .send({ name: "Azul" })
    const id = postResponse.body.id
    const response = await api.get("/api/boardgames/" + id)
    expect(response.status).toBe(200)
})

test("Put modifies boardgame", async () => {
    const postResponse = await api
        .post("/api/boardgames")
        .set("authorization", testUtils.getToken())
        .send({ name: "Azul" })
    const id = postResponse.body.id
    const response = await api
        .put("/api/boardgames/" + id)
        .set("authorization", testUtils.getToken())
        .send({ timesPlayed: 1 })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("timesPlayed", 1)
})

