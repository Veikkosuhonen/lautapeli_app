const express = require("express")
const app = express()

let todos = [
    {
        "id": 0,
        "content": "Hello"
    }
]

app.get("/", (request, response) => {
    console.log("GET " + request.url)
    response.send("<h1>Hello Worldz!</h1>")
})

app.get("/api/notes", (request, response) => {
    console.log("GET " + request.url)
    response.json(todos)
})

// eslint-disable-next-line no-undef
const PORT = process.env.PORT |3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})