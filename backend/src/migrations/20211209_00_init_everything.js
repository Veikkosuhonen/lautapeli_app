const { DataTypes } = require("sequelize")

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.createTable("boardgames", {
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
        await queryInterface.createTable("play_sessions", {
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
        await queryInterface.createTable("users", {
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
    down: async (queryInterface) => {
        await queryInterface.dropTable("play_sessions")
        await queryInterface.dropTable("boardgames")
        await queryInterface.dropTable("users")
    },
}
