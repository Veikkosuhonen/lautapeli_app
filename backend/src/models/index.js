const Boardgame = require("./boardgame")
const User = require("./user")
const PlaySession = require("./playsession")

Boardgame.hasMany(PlaySession)
PlaySession.belongsTo(Boardgame)

Boardgame.sync({ alter: true })
User.sync({ alter: true })
PlaySession.sync({ alter: true })


module.exports = {
    Boardgame, User, PlaySession
}