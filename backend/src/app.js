const path = require("path")
const express = require("express")
const cors = require("cors")
const { connectToDatabase } = require("./util/db")

const requestLogger = require("./middleware/requestLogger"),
    errorHandler = require("./middleware/errorHandler"),
    requireHTTPS = require("./middleware/requireHTTPS")

const boardgameRouter = require("./controllers/boardgames"),
    playSessionRouter = require("./controllers/playSessions"),
    activityRouter = require("./controllers/activities"),
    usersRouter = require("./controllers/users"),
    registerRouter = require("./controllers/register"),
    loginRouter = require("./controllers/login"),
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



app.use("/api/boardgames", boardgameRouter)
app.use("/api/playsessions", playSessionRouter)
app.use("/api/activities", activityRouter)
app.use("/api/users", usersRouter)
app.use("/api/register", registerRouter)
app.use("/api/login", loginRouter)
app.use("/api/admin", adminRouter)

// https://ui.dev/react-router-cannot-get-url-refresh/
app.get("/*", function(req, res) {
    // eslint-disable-next-line no-undef
    res.sendFile(path.join(__dirname, "../build/index.html"), function(err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

app.use(unknownEndpointRouter)

app.use(errorHandler)

module.exports = app
