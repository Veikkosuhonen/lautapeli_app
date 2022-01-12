const { DataTypes } = require("sequelize")

module.exports = {
    up: async ({ context: sequelize }) => {
        await sequelize.getQueryInterface().addColumn("players", "score", {
            type: DataTypes.INTEGER,
            defaultValue: 0
        })
    },
    down: async ({ context: sequelize }) => {
        await sequelize.getQueryInterface().removeColumn("players", "score")
    },
}
