const Boardgame = require("./boardgame")
const User = require("./user")
const PlaySession = require("./playSession")
const Player = require("./player")
const Activity = require("./activity")
const Code = require("./code")
const Like = require("./like")

Boardgame.hasMany(PlaySession)
PlaySession.belongsTo(Boardgame)

User.belongsToMany(PlaySession, { through: Player, as: "players" })
PlaySession.belongsToMany(User, { through: Player, as: "players" })

User.hasMany(Boardgame, { foreignKey: "addedById", as: "addedBy" })
Boardgame.belongsTo(User, { foreignKey: "addedById", as: "addedBy" })

User.belongsToMany(Boardgame, { through: Like, as: "likes" } )
Boardgame.belongsToMany(User, { through: Like, as: "likes" } )
User.hasMany(Like)
Boardgame.hasMany(Like)
Like.belongsTo(User)
Like.belongsTo(Boardgame)

module.exports = {
    Boardgame, User, PlaySession, Player, Activity, Code
}
