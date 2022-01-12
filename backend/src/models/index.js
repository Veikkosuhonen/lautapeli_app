const Boardgame = require("./boardgame")
const User = require("./user")
const PlaySession = require("./playSession")
const Player = require("./player")
const Activity = require("./activity")

Boardgame.hasMany(PlaySession)
PlaySession.belongsTo(Boardgame)

User.belongsToMany(PlaySession, { through: Player, as: "players" })
PlaySession.belongsToMany(User, { through: Player, as: "players" })

User.hasMany(Boardgame, { foreignKey: "addedById", as: "addedBy" })
Boardgame.belongsTo(User, { foreignKey: "addedById", as: "addedBy" })

module.exports = {
    Boardgame, User, PlaySession, Player, Activity
}
