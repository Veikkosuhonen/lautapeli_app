const { DataTypes } = require("sequelize")

module.exports = {
    up: async ({ context: sequelize }) => {
        await sequelize.getQueryInterface().changeColumn("users", "name", {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        })
        
    },
    down: async ({ context: sequelize }) => {
        await sequelize.getQueryInterface().changeColumn("users", "name", {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        })
    },
}
