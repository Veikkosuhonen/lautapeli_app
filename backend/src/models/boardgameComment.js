const { Model, DataTypes } = require("sequelize")

const { sequelize } = require("../util/db")

class BoardgameComment extends Model {}

BoardgameComment.init({
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
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    timestamps: false,
    modelName: "boardgameComment"
})

module.exports = BoardgameComment