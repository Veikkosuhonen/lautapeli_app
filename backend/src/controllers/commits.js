const router = require("express").Router()
const githubCommits = require("../util/githubCommits")


router.get("/", async (_, response) => {
    return response.json(githubCommits.getRecentCommits())
})

module.exports = router