const supertest = require("supertest")
const app = require("../app")
const { PlaySession, Boardgame, User, Player } = require("../models")
const testUtils = require("./testUtils")

const api = supertest(app)


beforeAll((done) => {
    app.on("dbReady", async () => {
        await testUtils.createUser(api)
        done()
    })
})

beforeEach(async () => {
    await Player.destroy({ where: { } })
    await PlaySession.destroy({ where: { } })
    await Boardgame.destroy({ where: { } })
    const bg = await Boardgame.create({ name: "Shogun" })
    await PlaySession.create({
        boardgameId: bg.id,
        duration: 180,
        date: new Date(),
        players: []
    })
    await PlaySession.create({
        boardgameId: bg.id,
        duration: 240,
        date: new Date(),
        players: []
    })
    await testUtils.login(api)
})

afterEach(async () => {
    await Player.destroy({ where: { } })
    await PlaySession.destroy({ where: { } })
    await Boardgame.destroy({ where: { } })
})

test("All playsessions are retrieved", async () => {
    const response = await api.get("/api/playsessions/")
        .set("authorization", testUtils.getToken())
        .expect(200)
        .expect("Content-Type", /application\/json/)
    
    expect(response.body).toHaveLength(2)
})

test("Playsessions of one boardgame are retrieved", async () => {
    const bg = await Boardgame.findOne()
    const response = await api.get("/api/boardgames/" + bg.id)
        .set("authorization", testUtils.getToken())
        .expect(200)
        .expect("Content-Type", /application\/json/)
    
    expect(response.body.playSessions).toHaveLength(2)
})

test("Playsessions can be posted", async () => {
    const bg = await Boardgame.findOne()
    const response = await api.post("/api/playsessions/")
        .send({
            boardgameId: bg.id,
            duration: 180,
            date: new Date(),
            players: []
        })
        .set("authorization", testUtils.getToken())
        .expect(200)
        .expect("Content-Type", /application\/json/)
    
    expect(response.body.id).toBeDefined()
    expect(response.body.date).toBeDefined()

    const bgsResponse = await api.get("/api/boardgames/" + bg.id)
        .set("authorization", testUtils.getToken())
    
    expect(bgsResponse.body.playSessions).toHaveLength(3)
})

test("Players can be posted to playsessions", async () => {
    const user = await User.findOne()
    const playSession = await PlaySession.findOne()
    const response = await api.post("/api/playsessions/"+ playSession.id + "/players")
        .send({ playerId: user.id })
        .set("authorization", testUtils.getToken())
        .expect(200)
    
    expect(response.body.playerId).toBeDefined()

    const psResponse = await api.get("/api/playsessions/" + playSession.id)
        .set("authorization", testUtils.getToken())
    
    expect(psResponse.body.players).toHaveLength(1)
})