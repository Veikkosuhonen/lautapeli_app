const { DataTypes } = require("sequelize")

module.exports = {
    up: async ({ context: sequelize }) => {
        await sequelize.getQueryInterface().addColumn("playSessions", "description", {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: ""
        })
        
    },
    down: async ({ context: sequelize }) => {
        await sequelize.getQueryInterface().removeColumn("playSessions", "description")
    },
}
