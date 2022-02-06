const { DataTypes } = require("sequelize")

module.exports = {
    up: async ({ context: sequelize }) => {
        await sequelize.getQueryInterface().addColumn("images", "boardgameId", {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: "boardgames", column: "id" }
        })
        await sequelize.getQueryInterface().addColumn("images", "playSessionId", {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: "playSessions", column: "id" }
        })
        await sequelize.getQueryInterface().addColumn("images", "userId", {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: "users", column: "id" }
        })
        
    },
    down: async ({ context: sequelize }) => {
        await sequelize.getQueryInterface().removeColumn("images", "boardgameId")
        await sequelize.getQueryInterface().removeColumn("images", "playSessionId")
        await sequelize.getQueryInterface().removeColumn("images", "userId")
    },
}
