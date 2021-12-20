const { DataTypes } = require("sequelize")

module.exports = {
    up: async ({ context: sequelize }) => {
        await sequelize.getQueryInterface().createTable("players", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' },
            },
            playsessionId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'playSessions', key: 'id' },
            },
        })
    },
    down: async ({ context: sequelize }) => {
        await sequelize.getQueryInterface().dropTable("players")
    },
}
