const supertest = require("supertest")
const app = require("../app")
const { sequelize, connectToDatabase } = require("../util/db")
const { PlaySession, Boardgame } = require("../models")
const testUtils = require("./testUtils")

const api = supertest(app)


beforeAll((done) => {
    app.on("dbReady", async () => {
        await testUtils.register(api)
        done()
    })
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
    await testUtils.login(api)
})

afterEach(async () => {
    await PlaySession.destroy({ where: { } })
    await Boardgame.destroy({ where: { } })
})

test("All playsessions are retrieved", async () => {
    const response = await api.get("/api/playsessions/")
        .set("authorization", testUtils.getToken())
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    expect(response.body).toHaveLength(2)
})

test("Playsessions of one boardgame are retrieved", async () => {
    const bg = await Boardgame.findOne()
    const response = await api.get("/api/boardgames/" + bg.id)
        .set("authorization", testUtils.getToken())
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    expect(response.body.playSessions).toHaveLength(2)
})

test("Playsessions can be posted", async () => {
    const bg = await Boardgame.findOne()
    const response = await api.post("/api/playsessions/")
        .send({ boardgameId: bg.id, duration: 200 })
        .set("authorization", testUtils.getToken())
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    expect(response.body.id).toBeDefined()
    expect(response.body.date).toBeDefined()
})