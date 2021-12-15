const express = require("express")
const app = express()

app.use(express.json())

let boardgames = [
    {
        id: 0,
        name: "Hello",
        
    }
]

app.get("/", (request, response) => {
    response.send("<h1>Lautapelit!</h1>")
    //console.log("GET " + request.url)
})

app.get("/api/boardgames", (request, response) => {
    //console.log("GET " + request.url)
    response.json(boardgames)
})

const validateBoardgame = (body) => {
    return body.content
}

const addBoardgame = (body) => {
    if (!validateBoardgame(body)) {
        return {
            error: "Invalid body!"
        }
    }

    let boardgame = {
        id: boardgames.length,
        content: body.content
    }

    boardgames.push(boardgame)
    return boardgame
}

app.post("/api/boardgames", (request, response) => {
    const boardgame = request.body
    //console.log(boardgame)
    response.json(addBoardgame(boardgame))
})

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})