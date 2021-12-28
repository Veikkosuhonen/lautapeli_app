const bcrypt = require("bcrypt")
const router = require("express").Router()
const { User } = require("../models")
const { auth } = require("../middleware/authorization")

router.get("/", auth, async (req, res) => {
    const users = await User.findAll({
        attributes: { exclude: ["username", "passwordHash", "isAdmin"] }
    })
    res.json(users)
})

router.post("/", async (req, res, next) => {
    try {
        const body = req.body

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

router.get("/:id", auth, async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ["username", "passwordHash", "isAdmin"] }
    })
    if (user) {
        res.json(user)
    } else {
        res.status(404).end()
    }
})

module.exports = router
