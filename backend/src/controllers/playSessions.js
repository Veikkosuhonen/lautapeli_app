const router = require("express").Router()

const { PlaySession, Boardgame, Player, User } = require("../models")
const { auth } = require("../middleware/authorization")

router.get("/", auth, async (request, response) => {
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
    return (
        body.boardgameId !== undefined &&
        body.duration !== undefined &&
        body.players !== undefined
    )
}

router.post("/", auth, async (request, response) => {
    const playSession = request.body
    if (!validatePlaysession(playSession)) {
        return response.status(400).json({ error: "Invalid playsession" })
    }

    const playSessionObject = { 
        boardgameId: playSession.boardgameId, 
        duration: playSession.duration, 
        date: playSession.date
    }

    try {
        const ps = await PlaySession.create(playSessionObject)

        await Promise.all(playSession.players.map(async player => 
            Player.create({ userId: player.id, playSessionId: ps.id })
        ))

        const result = await PlaySession.findByPk(ps.id, {
            include: [{ model: User, as: "players", attributes: ["id", "name"], through: { attributes: [] } }]
        })

        console.log(JSON.stringify(result))
        return response.json(result)

    } catch(error) {
        console.log(error)
        return response.status(400).json({ error })
    }
})


// Currently unused
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