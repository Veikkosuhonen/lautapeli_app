const { Code } = require("../models")
const { Op } = require("sequelize")

const EXPIRATION_SECONDS = 3600 * 48
const CODE_LENGTH = 4


const generateCode = () => {
    let code = ""
    for (let i = 0; i < CODE_LENGTH; i++) {
        code += Math.floor(Math.random() * 10)
    }
    return code
}

const createNew = async () => {
    //removeDatedCodes()
    let created = false
    let code
    let tries = 0

    while (!created) {
        if (tries > 10) {
            throw new Error("Code generation failed after 10 attempts")
        }

        const newCode = {
            code: generateCode(),
            date: Date.now()
        }
        try {
            code = await Code.create(newCode)
            created = true
        } catch (e) {
            if (e.name !== "SequelizeUniqueConstraintError") {
                throw e
            }
            tries += 1
        }
    }
    
    return code
}

const removeDatedCodes = async () => {
    const now = Date.now()
    await Code.destroy({ where: 
        { 
            date: { 
                [Op.lt]: now - 1000 * EXPIRATION_SECONDS
            }
        } 
    })
}

const useCode = async (code) => {
    await removeDatedCodes()
    const isValid = await Code.findOne({ where: {
        code: code
    }})
    if (isValid) {
        await Code.destroy({ where: {
            code: code
        }})
        return true
    }
    return false
}

const getAll = async () => {
    return await Code.findAll()
}

module.exports = { EXPIRATION_SECONDS, createNew, useCode, getAll } 