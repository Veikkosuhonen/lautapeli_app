const { sequelize } = require("../util/db")
const { User } = require("../models")

afterAll(async () => { 
    await User.destroy({ where: {} })
})