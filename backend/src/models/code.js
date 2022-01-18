const { Model, DataTypes } = require("sequelize")

const { sequelize } = require("../util/db")


class Code extends Model {}

Code.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING(4),
        unique: true,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: false,
    modelName: "code"
})

module.exports = Code