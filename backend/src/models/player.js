const { Model, DataTypes } = require("sequelize")

const { sequelize } = require("../util/db")

class Player extends Model {}

Player.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
    },
    playSessionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "playSessions", key: "id" },
    },
}, {
    sequelize,
    timestamps: false,
    modelName: "player"
})

module.exports = Player