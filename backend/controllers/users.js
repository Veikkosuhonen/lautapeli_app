const bcrypt = require("bcrypt")
const router = require("express").Router()

const { User } = require("../models")

router.get("/", async (req, res) => {
    const users = await User.findAll({
        include: {
            attributes: { exclude: ["passwordHash"]}
        }
    })
    res.json(users)
})

router.post("/", async (req, res) => {
    try {
        const body = req.body

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const userObject = {
            username: body.username,
            name: body.name,
            passwordHash,
        }

        const user = await User.create(userObject)
        res.json(user)
    } catch(error) {
        return res.status(400).json({ error })
    }
})

router.get("/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if (user) {
        res.json(user)
    } else {
        res.status(404).end()
    }
})

module.exports = router
