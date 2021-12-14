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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})