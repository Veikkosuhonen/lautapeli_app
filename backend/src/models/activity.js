const { Model, DataTypes } = require("sequelize")

const { sequelize } = require("../util/db")


class Activity extends Model {}

Activity.init({
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
}, {
    sequelize,
    timestamps: false,
    modelName: "activity"
})

module.exports = Activity