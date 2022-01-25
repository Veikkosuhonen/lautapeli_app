const { DataTypes } = require("sequelize")

module.exports = {
    up: async ({ context: sequelize }) => {
        await sequelize.getQueryInterface().createTable("likes", {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "users", key: "id" },
            },
            boardgameId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "boardgames", key: "id" },
            },
        })
    },
    down: async ({ context: sequelize }) => {
        await sequelize.getQueryInterface().dropTable("likes")
    },
}
