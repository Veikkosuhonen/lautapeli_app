const supertest = require("supertest")
const app = require("../app")
const { sequelize, connectToDatabase } = require("../util/db")

const api = supertest(app)


beforeAll((done) => {
    app.on("dbReady", () => done())
})

test("Boardgames are returned as json", async () => {
    await api
        .get("/api/boardgames")
        .expect(200)
        .expect("Content-Type", /application\/json/)
})
