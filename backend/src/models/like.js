const { Model, DataTypes } = require("sequelize")

const { sequelize } = require("../util/db")

class Like extends Model {}

Like.init({
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
    boardgameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "boardgames", key: "id" },
    },
}, {
    sequelize,
    timestamps: false,
    modelName: "like"
})

module.exports = Like