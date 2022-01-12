const { DataTypes } = require("sequelize")

module.exports = {
    up: async ({ context: sequelize }) => {
        await sequelize.getQueryInterface().addColumn("activities", "date", {
            type: DataTypes.DATE,
            allowNull: true
        })
    },
    down: async ({ context: sequelize }) => {
        await sequelize.getQueryInterface().removeColumn("activities", "date")
    },
}
