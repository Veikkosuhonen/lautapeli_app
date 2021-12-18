const express = require("express")
const cors = require("cors")
const app = express()

const { connectToDatabase } = require("./util/db")


connectToDatabase()


app.use(cors())
app.use(express.json())
app.use(express.static("build"))

const bgRouter = require("./controllers/boardgames")
const playsessionRouter = require("./controllers/playsessions")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")

app.use("/api/boardgames", bgRouter)
app.use("/api/playsessions", playsessionRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

module.exports = app