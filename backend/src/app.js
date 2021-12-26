const express = require("express")
const cors = require("cors")
const { connectToDatabase } = require("./util/db")
const requestLogger = require("./middleware/requestLogger")
const errorHandler = require("./middleware/errorHandler")
const app = express()

connectToDatabase().then(() => {
    app.emit("dbReady")
})

app.use(express.static("build"))
app.use(express.json())
app.use(cors())

app.use(requestLogger)

const bgRouter = require("./controllers/boardgames")
const playsessionRouter = require("./controllers/playSessions")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const profileRouter = require("./controllers/myprofile")
const unknownEndpointRouter = require("./controllers/unknownEndpoint")

app.use("/api/boardgames", bgRouter)
app.use("/api/playsessions", playsessionRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)
app.use("/api/myprofile", profileRouter)
app.use(unknownEndpointRouter)

app.use(errorHandler)

module.exports = app
