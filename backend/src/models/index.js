const Boardgame = require("./boardgame")
const User = require("./user")
const PlaySession = require("./playsession")
const Player = require("./player")

Boardgame.hasMany(PlaySession)
PlaySession.belongsTo(Boardgame)

User.belongsToMany(PlaySession, { through: Player })
PlaySession.belongsToMany(User, { through: Player })

module.exports = {
    Boardgame, User, PlaySession, Player
}
