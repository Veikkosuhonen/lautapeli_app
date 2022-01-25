const { Model, DataTypes } = require("sequelize")

const { sequelize } = require("../util/db")

class Like extends Model {}

Like.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
    },
    boardgameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "playSessions", key: "id" },
    },
}, {
    sequelize,
    timestamps: false,
    modelName: "like"
})

module.exports = Like