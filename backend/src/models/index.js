const Boardgame = require("./boardgame")
const User = require("./user")
const PlaySession = require("./playsession")

Boardgame.hasMany(PlaySession)
PlaySession.belongsTo(Boardgame)

module.exports = {
    Boardgame, User, PlaySession
}