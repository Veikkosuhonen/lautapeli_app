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
    playsessionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "playsessions", key: "id" },
    },
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "player"
})

module.exports = Player