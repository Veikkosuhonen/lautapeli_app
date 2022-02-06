const { Model, DataTypes } = require("sequelize")

const { sequelize } = require("../util/db")


class Image extends Model {}

Image.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fileName: {
        type: DataTypes.STRING(16),
        unique: true,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    boardgameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "boardgames", key: "id" },
    },
    playSessionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "playSessions", key: "id" },
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", column: "id" }
    }
}, {
    sequelize,
    timestamps: false,
    modelName: "image"
})

module.exports = Image