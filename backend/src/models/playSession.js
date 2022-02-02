const { Model, DataTypes } = require("sequelize")

const { sequelize } = require("../util/db")

class PlaySession extends Model {}

PlaySession.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    boardgameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "boardgames", key: "id" },
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: ""
    }
}, {
    sequelize,
    timestamps: false,
    modelName: "playSession"
})

module.exports = PlaySession