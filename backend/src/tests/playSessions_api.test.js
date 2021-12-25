const supertest = require("supertest")
const app = require("../app")
const { sequelize, connectToDatabase } = require("../util/db")
const { PlaySession, Boardgame } = require("../models")

const api = supertest(app)


beforeAll((done) => {
    app.on("dbReady", () => done())
})

beforeEach(async () => {
    await PlaySession.destroy({ where: { } })
    await Boardgame.destroy({ where: { } })
    const bg = await Boardgame.create({ name: "Shogun" })
    await PlaySession.create({
        boardgameId: bg.id,
        duration: 180
    })
    await PlaySession.create({
        boardgameId: bg.id,
        duration: 240
    })
})

afterEach(async () => {
    await PlaySession.destroy({ where: { } })
    await Boardgame.destroy({ where: { } })
})

test("All playsessions are retrieved", async () => {
    const response = await api.get("/api/playsessions/")
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    expect(response.body).toHaveLength(2)
})

test("Playsessions of one boardgame are retrieved", async () => {
    const bg = await Boardgame.findOne()
    const response = await api.get("/api/boardgames/" + bg.id)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    expect(response.body.playSessions).toHaveLength(2)
})

test("Playsessions can be posted", async () => {
    const bg = await Boardgame.findOne()
    const response = await api.post("/api/playsessions/")
        .send({ boardgameId: bg.id, duration: 200 })
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    expect(response.body.id).toBeDefined()
    expect(response.body.date).toBeDefined()
})