const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("build"))

let boardgames = [
    {
        id: 0,
        name: "Hello",
    }
]

app.get("/api/boardgames", (request, response) => {
    //console.log("GET " + request.url)
    response.json(boardgames)
})

const validateBoardgame = (body) => {
    return body.name !== undefined
}

const addBoardgame = (body) => {
    let boardgame = {
        id: boardgames.length,
        name: body.name
    }

    boardgames.push(boardgame)
    return boardgame
}

app.post("/api/boardgames", (request, response) => {
    const boardgame = request.body
    if (!validateBoardgame(boardgame)) {
        response.sendStatus(405)
    } else {
        response.json(addBoardgame(boardgame))
    }
})

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})