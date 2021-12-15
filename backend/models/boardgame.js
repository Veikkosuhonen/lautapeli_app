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
    timesPlayed: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    dateAdded: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "boardgame"
})

module.exports = Boardgame