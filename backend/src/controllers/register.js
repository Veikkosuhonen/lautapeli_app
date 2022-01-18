const bcrypt = require("bcrypt")
const router = require("express").Router()
const { User, Activity } = require("../models")
const signupCodeService = require("../util/signupCodeService")
const logger = require("../util/logger")

router.post("/", async (req, res, next) => { 

    const body = req.body
    if (!(body.username && body.name && body.password && body.code)) {
        return res.status(400).json({ error: "invalid registration credentials" })
    }

    const usernameInUse = await User.findOne({ where: { username: body.username }})
    if (usernameInUse) {
        return res.status(400).json({ error: "Account with that username already exists" })
    }

    const nameTaken = await User.findOne({ where: { name: body.name }})
    if (nameTaken) {
        return res.status(400).json({ error: `Name '${body.name}' is taken` })
    }

    const codeValid = await signupCodeService.useCode(body.code)
    if (!codeValid) {
        logger.info("Tried to use code '" + body.code + "' but it was invalid")
        return res.status(401).json({ error: "code expired or invalid" })
    }

    try {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const userObject = {
            username: body.username,
            name: body.name,
            passwordHash,
            isAdmin: false
        }

        const user = await User.create(userObject)
        Activity.create({ description: `${user.name} joined. Welcome!`, link: "/" })
        res.json({ id: user.id, username: user.username, name: user.name, isAdmin: user.isAdmin })
        
    } catch(error) {
        if (error.name === "SequelizeUniqueConstraintError" | "SequelizeValidationError") {
            return res.status(400).send({ status: 400, error: "Invalid registration credentials" })
        }
        next(error)
    }
})

module.exports = router