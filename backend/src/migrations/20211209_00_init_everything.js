const { DataTypes } = require("sequelize")

module.exports = {
    up: async ({ context: sequelize }) => {
        await sequelize.getQueryInterface().createTable("boardgames", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.TEXT,
                unique: true,
                allowNull: false
            },
            timesPlayed: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            dateAdded: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            }    
        })
        await sequelize.getQueryInterface().createTable("playSessions", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            boardgameId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "boardgames", key: "id" },
            },
            duration: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            }
        })
        await sequelize.getQueryInterface().createTable("users", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            passwordHash: {
                type: DataTypes.STRING,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
        })
    },
    down: async ({ context: sequelize }) => {
        await sequelize.getQueryInterface().dropTable("playSessions")
        await sequelize.getQueryInterface().dropTable("boardgames")
        await sequelize.getQueryInterface().dropTable("users")
    },
}
