const supertest = require("supertest")
const app = require("../app")
const { sequelize } = require("../util/db")

const api = supertest(app)


beforeAll((done) => {
    app.on("dbReady", () => done())
})

test("Users are returned as json", async () => {
    await api
        .get("/api/users")
        .expect(200)
        .expect("Content-Type", /application\/json/)
})
