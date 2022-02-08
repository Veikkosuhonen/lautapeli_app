const supertest = require("supertest")
const app = require("../app")
const { Image, Boardgame } = require("../models")
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
    await Image.destroy({ where: {} })
    await Boardgame.destroy({ where: {} })
})

test("Can only get upload url when authorized", async () => {
    await api.get("/api/upload/boardgame")
        .expect(401)

    await api.get("/api/upload/boardgame")
        .set("Authorization", testUtils.getToken())
        .expect(400)
})

test("Receives url when request valid", async () => {
    const boardgameId = (await Boardgame.findOne()).id
    const response = await api.get("/api/upload/boardgame?boardgameId=" + boardgameId + "&fileType=image/jpeg")
        .set("Authorization", testUtils.getToken())
        .expect(200)
    
    expect(response.body.url).toBeDefined()
})