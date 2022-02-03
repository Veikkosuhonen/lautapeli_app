const { Model, DataTypes } = require("sequelize")

const { sequelize } = require("../util/db")


class Image extends Model {}

Image.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    link: {
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
    modelName: "image"
})

module.exports = Image