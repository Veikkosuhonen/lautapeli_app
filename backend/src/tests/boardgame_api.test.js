const supertest = require("supertest")
const app = require("../app")
const { Boardgame, PlaySession, Player } = require("../models")
const testUtils = require("./testUtils")

const api = supertest(app)


beforeAll((done) => {
    app.on("dbReady", async () => { 
        await testUtils.createUser(api)
        done()
    })
})

beforeEach(async () => {
    await Boardgame.create({ name: "Shogun" })
    await testUtils.login(api)
})

afterEach(async () => {
    await Player.destroy({ where: { }})
    await PlaySession.destroy({ where: { }})
    await Boardgame.destroy({ where: { } })
})

test("Boardgames are returned as json", async () => {
    await api
        .get("/api/boardgames")
        .set("authorization", testUtils.getToken())
        .expect(200)
        .expect("Content-Type", /application\/json/)
})

test("Response contains one object", async () => {
    const response = await api
        .get("/api/boardgames") 
        .set("authorization", testUtils.getToken())
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
        .expect(400)
})

test("Posted boardgame is added", async () => {
    await api
        .post("/api/boardgames")
        .set("authorization", testUtils.getToken())
        .send({ name: "Azul" })
    const response = await api
        .get("/api/boardgames")
        .set("authorization", testUtils.getToken())
    expect(response.body).toHaveLength(2)
})

test("Can get posted boardgame", async () => {
    const postResponse = await api
        .post("/api/boardgames")
        .set("authorization", testUtils.getToken())
        .send({ name: "Azul" })
    const id = postResponse.body.boardgame.id
    const response = await api
        .get("/api/boardgames/" + id)
        .set("authorization", testUtils.getToken())
    expect(response.status).toBe(200)
})

test("Put modifies boardgame", async () => {
    const postResponse = await api
        .post("/api/boardgames")
        .set("authorization", testUtils.getToken())
        .send({ name: "Azul" })
    const id = postResponse.body.boardgame.id
    const response = await api
        .put("/api/boardgames/" + id)
        .set("authorization", testUtils.getToken())
        .send({ name: "Azul: Summer Pavilion" })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("name", "Azul: Summer Pavilion")
})

test("Creator can delete boardgame", async () => {
    const postResponse = await api
        .post("/api/boardgames")
        .set("authorization", testUtils.getToken())
        .send({ name: "Azul" })
    const id = postResponse.body.boardgame.id
    const response = await api
        .delete("/api/boardgames/" + id)
        .set("authorization", testUtils.getToken())
        .expect(200)
    expect(response.body.id).toBe(id)
})

test("Not creator cannot delete boardgame", async () => {
    const postResponse = await api
        .post("/api/boardgames")
        .set("authorization", testUtils.getToken())
        .send({ name: "Azul" })
    const id = postResponse.body.boardgame.id
    // login as someone else
    await testUtils.createUser(api, "Other", "person123")
    await testUtils.login(api, "Other", "person123")
    await api
        .delete("/api/boardgames/" + id)
        .set("authorization", testUtils.getToken())
        .expect(401)
})

test("Cannot delete if has playSessions", async () => {
    const postResponse = await api
        .post("/api/boardgames")
        .set("authorization", testUtils.getToken())
        .send({ name: "Azul" })
    const id = postResponse.body.boardgame.id

    const user = testUtils.getCurrentUser()
    await api.post("/api/playsessions/")
        .send({
            boardgameId: id,
            duration: 180,
            date: new Date(),
            players: [{ id: user.id, score: 0 }]
        })
        .set("authorization", testUtils.getToken())
        .expect(200)
    
    await api.delete("/api/boardgames/" + id)
        .set("authorization", testUtils.getToken())
        .expect(403)
})