const express = require("express")
const cors = require("cors")
const { connectToDatabase } = require("./util/db")

const requestLogger = require("./middleware/requestLogger"),
    errorHandler = require("./middleware/errorHandler"),
    requireHTTPS = require("./middleware/requireHTTPS")

const bgRouter = require("./controllers/boardgames"),
    playsessionRouter = require("./controllers/playSessions"),
    usersRouter = require("./controllers/users"),
    registerRouter = require("./controllers/register"),
    loginRouter = require("./controllers/login"),
    profileRouter = require("./controllers/myprofile"),
    adminRouter = require("./controllers/admin"),
    unknownEndpointRouter = require("./controllers/unknownEndpoint")

const app = express()

connectToDatabase().then(() => {
    app.emit("dbReady")
})

app.use(requireHTTPS)
app.use(cors())
app.use(express.static("build"))
app.use(express.json())

app.use(requestLogger)



app.use("/api/boardgames", bgRouter)
app.use("/api/playsessions", playsessionRouter)
app.use("/api/users", usersRouter)
app.use("/api/register", registerRouter)
app.use("/api/login", loginRouter)
app.use("/api/myprofile", profileRouter)
app.use("/api/admin", adminRouter)
app.use(unknownEndpointRouter)

app.use(errorHandler)

module.exports = app
