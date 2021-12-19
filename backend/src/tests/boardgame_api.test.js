const supertest = require("supertest")
const app = require("../app")
const { sequelize, connectToDatabase } = require("../util/db")
const { Boardgame } = require("../models")

const api = supertest(app)


beforeAll((done) => {
    app.on("dbReady", () => done())
})

beforeEach(async () => {
    await Boardgame.create({ name: "Shogun" })
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

test("Valid boardgame can be posted", async () => {
    const newBg = { name: "Everdell" }
    const response = await api
        .post("/api/boardgames")
        .send(newBg)
        .expect(200)
        .expect("Content-Type", /application\/json/)
})

test("Posted boardgame is added", async () => {
    await api.post("/api/boardgames").send({ name: "Azul" })
    const response = await api.get("/api/boardgames")
    expect(response.body).toHaveLength(2)
})

test("Can get posted boardgame", async () => {
    const postResponse = await api.post("/api/boardgames").send({ name: "Azul" })
    const id = postResponse.body.id
    const response = await api.get("/api/boardgames/" + id)
    expect(response.status).toBe(200)
})

test("Put modifies boardgame", async () => {
    const postResponse = await api.post("/api/boardgames").send({ name: "Azul" })
    const id = postResponse.body.id
    const response = await api.put("/api/boardgames/" + id).send({ timesPlayed: 1 })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("timesPlayed", 1)
})

