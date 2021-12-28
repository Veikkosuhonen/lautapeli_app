const bcrypt = require("bcrypt")
const router = require("express").Router()
const { User } = require("../models")
const signupCodeService = require("../util/signupCodeService")

router.post("/", async (req, res, next) => {

    const body = req.body
    if (!(body.username && body.name && body.password && body.code)) {
        return res.status(400).json({ error: "invalid registration credentials" })
    }
    if (!signupCodeService.useCode(body.code)) {
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
        res.json({ id: user.id, username: user.username, name: user.name, isAdmin: user.isAdmin })
    } catch(error) {
        next(error)
    }
})

module.exports = router