const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const router = require("express").Router()

const { SECRET } = require("../util/config")
const User = require("../models/user")

router.post("/", async (request, response) => {
    const body = request.body

    const user = await User.findOne({
        where: {
            username: body.username
        }
    })

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)
    
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: "invalid username or password"
        })
    }

    if (user.disabled) {
        return response.status(401).json({
            error: "account disabled"
        })
    }

    const userForToken = {
        username: user.username,
        id: user.id,
    }

    const token = jwt.sign(userForToken, SECRET)

    response
        .status(200)
        .send({
            id: user.id,
            token, 
            username: user.username, 
            name: user.name, 
            isAdmin: user.isAdmin 
        })
})

module.exports = router