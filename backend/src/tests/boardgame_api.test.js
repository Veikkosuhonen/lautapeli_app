const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)

test("Boardgames are returned as json", async () => {
    await api
        .get("/api/boardgames")
        .expect(200)
        .expect("Content-Type", /application\/json/)
})
