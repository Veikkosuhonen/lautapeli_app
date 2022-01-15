const { Model, DataTypes } = require("sequelize")

const { sequelize } = require("../util/db")


class Boardgame extends Model {}

Boardgame.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: ""
    },
    dateAdded: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    addedById: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
    }
}, {
    sequelize,
    timestamps: false,
    modelName: "boardgame"
})

module.exports = Boardgame