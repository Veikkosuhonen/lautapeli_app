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
    
    const playSession = response.body.playSession
    expect(playSession.id).toBeDefined()
    expect(playSession.date).toBeDefined()

    const bgsResponse = await api.get("/api/boardgames/" + bg.id)
        .set("authorization", testUtils.getToken())
    
    expect(bgsResponse.body.playSessions).toHaveLength(3)
})

test("Playsessions can be deleted", async () => {
    // create a new one
    const bg = await Boardgame.findOne()
    let response = await api.post("/api/playsessions/")
        .send({
            boardgameId: bg.id,
            duration: 180,
            date: new Date(),
            players: [{ id: testUtils.getCurrentUser().id, score: 0 }]
        })
        .set("authorization", testUtils.getToken())
        .expect(200)
    
    const id = response.body.playSession.id
    
    // delete it
    response = await api.delete("/api/playsessions/" + id)
        .set("authorization", testUtils.getToken())
        .expect(200)
        .expect("Content-Type", /application\/json/)
    
    expect(response.body.id).toBe(id)
    
    // check that it no longer exists
    response = await api.get("/api/playsessions/")
        .set("authorization", testUtils.getToken())
        .expect(200)
        .expect("Content-Type", /application\/json/)
    
    const exists = response.body.map(ps => ps.id).includes(id)
    expect(exists).toBe(false)
})

test("Only players can delete playSession", async () => {
    // create a user
    const user = (await testUtils.createUser(api, "new", "password")).body

    // create a new session one
    const bg = await Boardgame.findOne()
    let response = await api.post("/api/playsessions/")
        .send({
            boardgameId: bg.id,
            duration: 180,
            date: new Date(),
            players: [{ id: user.id, score: 0 }]
        })
        .set("authorization", testUtils.getToken())
        .expect(200)
    
    const id = response.body.playSession.id
    
    // try to delete it
    response = await api.delete("/api/playsessions/" + id)
        .set("authorization", testUtils.getToken())
        .expect(401)
})