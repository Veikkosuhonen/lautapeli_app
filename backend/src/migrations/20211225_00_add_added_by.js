const { DataTypes } = require("sequelize")

module.exports = {
    up: async ({ context: sequelize }) => {
        await sequelize.getQueryInterface().addColumn("boardgames", "addedById", {
            type: DataTypes.INTEGER,
            references: { model: "users", key: "id" },
        })
    },
    down: async ({ context: sequelize }) => {
        await sequelize.getQueryInterface().removeColumn("boardgames", "addedById")
    },
}
