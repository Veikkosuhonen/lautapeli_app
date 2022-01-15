const { DataTypes } = require("sequelize")

module.exports = {
    up: async ({ context: sequelize }) => {
        await sequelize.getQueryInterface().addColumn("boardgames", "description", {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: ""
        })
        
    },
    down: async ({ context: sequelize }) => {
        await sequelize.getQueryInterface().removeColumn("boardgames", "description")
    },
}
