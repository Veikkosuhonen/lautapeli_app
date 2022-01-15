module.exports = {
    up: async ({ context: sequelize }) => {
        await sequelize.getQueryInterface().removeColumn("boardgames", "timesPlayed")
    },
    down: async ({ context: sequelize }) => {
        await sequelize.getQueryInterface().addColumn("boardgames", "timesPlayed", {
            type: DataTypes.INTEGER,
            defaultValue: 0
        })
    },
}
