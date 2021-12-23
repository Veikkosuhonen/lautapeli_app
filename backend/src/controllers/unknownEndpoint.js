const router = require("express").Router()

router.all("/", (_, response) => {
    response.status(404).send({ error: "unknown endpoint" })
})

module.exports = router