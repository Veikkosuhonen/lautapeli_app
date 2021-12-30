const bcrypt = require("bcrypt")
const router = require("express").Router()
const { User } = require("../models")
const { auth, adminAuth } = require("../middleware/authorization")

router.get("/", auth, async (req, res) => {
    const users = await User.findAll({
        attributes: { exclude: ["passwordHash"] }
    })
    res.json(users)
})

router.get("/:id", auth, async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ["passwordHash"] }
    })
    if (user) {
        res.json(user)
    } else {
        res.status(404).end()
    }
})

router.put("/:id", adminAuth, async (req, res) => {
    if (typeof(req.body.disabled) !== "boolean") {
        return res.status(400).json({ error: "missing or invalid disabled field" })
    }
    const user = await User.findByPk(req.params.id)
    user.disabled = req.body.disabled
    await user.save()
    return res.json(user)
})

router.post("/", adminAuth, async (req, res, next) => {
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

module.exports = router