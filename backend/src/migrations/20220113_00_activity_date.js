const { DataTypes } = require("sequelize")
const { MigrationError } = require("umzug")

module.exports = {
    up: async ({ context: sequelize }) => {
        try {
            await sequelize.getQueryInterface().addColumn("activities", "date", {
                type: DataTypes.DATE,
                allowNull: true
            })
        } catch (e) {
            if (e instanceof MigrationError) {
                return console.log("Date is already added to activities, skipping")
            }
            //throw e
        }
    },
    down: async ({ context: sequelize }) => {
        await sequelize.getQueryInterface().removeColumn("activities", "date")
    },
}
