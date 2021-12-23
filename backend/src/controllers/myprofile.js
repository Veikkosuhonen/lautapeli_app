const router = require("express").Router()

const getLoggedInUser = require("../util/authorisation")

router.get("/", async (req, res) => {
    const user = await getLoggedInUser(req)
    if (user) {
        return res.status(200).json(user)
    }
    return res.status(401).end()
})

module.exports = router