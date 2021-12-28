const router = require("express").Router()

const { PlaySession, Boardgame, Player, User } = require("../models")
const { auth } = require("../middleware/authorization")

router.get("/", auth, async (request, response) => {
    //console.log("GET " + request.url)
    const playsessions = await PlaySession.findAll({
        attributes: { exclude: ["boardgameId"] },
        include: [
            {
                model: Boardgame,
                attributes: { exclude: ["timesPlayed", "dateAdded", "addedById"] }
            },
            {
                model: User,
                as: "players",
                attributes: ["id", "name"],
                through: {
                    attributes: []
                }
            }
        ]
    })
    response.json(playsessions)
})

router.get("/:id", auth, async (request, response) => {
    const playsession = await PlaySession.findByPk(request.params.id, {
        attributes: { exclude: ["boardgameId"] },
        include: [
            {
                model: Boardgame,
                attributes: { exclude: ["timesPlayed", "dateAdded", "addedById"] }
            },
            {
                model: User,
                as: "players",
                attributes: ["id", "name"],
                through: {
                    attributes: []
                }
            }
        ]
    })
    if (playsession) {
        response.json(playsession)
    } else {
        response.status(404).end()
    }
})

const validatePlaysession = (body) => {
    return body.boardgameId !== undefined
}

router.post("/", auth, async (request, response) => {
    const playsession = request.body
    if (!validatePlaysession(playsession)) {
        response.sendStatus(403)
    } else {
        try {
            const bg = await Boardgame.findByPk(playsession.boardgameId)
            bg.timesPlayed += 1
            bg.save()
        } catch(error) {
            return response.status(400).json({ error })
        }
        try {
            const ps = await PlaySession.create({ boardgameId: playsession.boardgameId, duration: playsession.duration })
            return response.json(ps)
        } catch(error) {
            return response.status(400).json({ error })
        }
    }
})

router.post("/:id/players", auth, async (request, response) => {
    const playSession = await PlaySession.findByPk(request.params.id)
    if (!playSession) {
        return response.sendStatus(404)
    }
    const playerId = request.body.playerId
    const user = await User.findByPk(playerId)
    if (!playerId || !user) {
        return response.status(400).json({ error: "missing or invalid playerId" })
    }
    if ((await playSession.hasPlayer(user))) {
        return response.status(400).json({ error: "player already in playSession" })
    }
    await playSession.addPlayer(user)
    return response.status(200).json({ playerId })
})

module.exports = router