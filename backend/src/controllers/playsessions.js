const router = require("express").Router()

const { PlaySession, Boardgame } = require("../models")


router.get("/", async (request, response) => {
    //console.log("GET " + request.url)
    const playsessions = await PlaySession.findAll({
        attributes: { exclude: ["boardgameId"] },
        include: [
            {
                model: Boardgame,
                attributes: { exclude: ["timesPlayed", "dateAdded", "addedById"] }
            }
        ]
    })
    response.json(playsessions)
})

router.get("/:id", async (request, response) => {
    const playsession = await PlaySession.findByPk(request.params.id)
    if (playsession) {
        console.log(playsession.toJSON())
        response.json(playsession)
    } else {
        response.status(404).end()
    }
})

const validatePlaysession = (body) => {
    return body.boardgameId !== undefined
}

router.post("/", async (request, response) => {
    const playsession = request.body
    if (!validatePlaysession(playsession)) {
        response.sendStatus(405)
    } else {
        try {
            const bg = await Boardgame.findByPk(playsession.boardgameId)
            bg.timesPlayed += 1
            console.log(bg.name + " now played " + bg.timesPlayed + " times")
            bg.save()
        } catch(error) {
            return response.status(400).json({ error })
        }
        try {
            const ps = await PlaySession.create({ boardgameId: playsession.boardgameId, duration: playsession.duration })
            console.log(ps.toJSON())
            return response.json(ps)
        } catch(error) {
            return response.status(400).json({ error })
        }
    }
})

module.exports = router