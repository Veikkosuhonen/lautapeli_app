const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())

let boardgames = [
    {
        "id": 0,
        "content": "Hello"
    }
]

app.get("/", (request, response) => {
    console.log("GET " + request.url)
    response.send("<h1>Lautapelit!</h1>")
})

app.get("/api/boardgames", (request, response) => {
    console.log("GET " + request.url)
    response.json(boardgames)
})

app.post("/api/boardgames", (request, response) => {
    const boardgame = request.body
    console.log(boardgame)
    response.json(boardgame)
})

// eslint-disable-next-line no-undef
const PORT = process.env.PORT | 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
