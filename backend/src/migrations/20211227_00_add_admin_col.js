const { DataTypes } = require("sequelize")

module.exports = {
    up: async ({ context: sequelize }) => {
        await sequelize.getQueryInterface().addColumn("users", "isAdmin", {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        })
    },
    down: async ({ context: sequelize }) => {
        await sequelize.getQueryInterface().removeColumn("users", "isAdmin")
    },
}
