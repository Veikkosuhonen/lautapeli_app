const { DataTypes } = require("sequelize")

module.exports = {
    up: async ({ context: sequelize }) => {
        await sequelize.getQueryInterface().createTable("boardgameComments", {
            id: { 
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
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
            comment: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            }
        })
    },
    down: async ({ context: sequelize }) => {
        await sequelize.getQueryInterface().dropTable("boardgameComments")
    },
}
