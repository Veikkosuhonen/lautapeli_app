const router = require("express").Router()

const { PlaySession, Boardgame, Player, User, Activity } = require("../models")
const { auth } = require("../middleware/authorization")

router.get("/", auth, async (request, response) => {
    const playsessions = await PlaySession.findAll({
        attributes: ["id", "duration", "date"],
        include: [
            {
                model: Boardgame,
                attributes: ["id", "name"]
            },
            {
                model: User,
                as: "players",
                attributes: ["id", "name"],
                through: {
                    attributes: ["score"]
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
                attributes: { exclude: ["dateAdded", "addedById"] }
            },
            {
                model: User,
                as: "players",
                attributes: ["id", "name"],
                through: {
                    attributes: ["score"]
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

const validatePlaysession = (body, user) => {
    const hasFields = (
        body.boardgameId !== undefined &&
        body.duration !== undefined &&
        body.players !== undefined
    )
    if (!hasFields) return false
    try {
        const hasInvalidPlayers = body.players.some((player) => player.id === undefined || player.score === undefined)
        if (hasInvalidPlayers) return false
        const userInPlayers = body.players.some((player) => player.id === user.id)
        if (!userInPlayers) return false
    } catch (e) {
        return false
    }
    return true
}

const createActivity = async (playSession) => {
    const winnerId = playSession.players.reduce((acc, player) => 
        (player.player.score > acc.score ? { id: player.id, score: player.player.score } : acc), 
    { id: -1, score: -1 }
    ).id

    const winnerQuery = User.findByPk(winnerId, { attributes: ["name"] })

    const bg = await Boardgame.findByPk(playSession.boardgameId, { attributes: ["id", "name"] })

    const winner = await winnerQuery

    let description = `${bg.name} was played`
    if (winner) {
        if (playSession.players.length > 1) {
            description = `${winner.name} won in ${bg.name} with ${playSession.players.length - 1} other${playSession.players.length > 2 ? "s" : ""}`
        } else {
            description = `${winner.name} won in ${bg.name}`
        }
    }
    
    return await Activity.create({ 
        description: description, 
        link: `/boardgames/${bg.id}`
    })
}

router.post("/", auth, async (request, response) => {
    const playSession = request.body
    if (!validatePlaysession(playSession, request.user)) {
        return response.status(400).json({ error: "Invalid playsession" })
    }

    const playSessionObject = { 
        boardgameId: playSession.boardgameId, 
        duration: playSession.duration, 
        date: playSession.date,
        description: playSession.description
    }

    try {
        const ps = await PlaySession.create(playSessionObject)

        await Player.bulkCreate(playSession.players.map(player => 
            ({ userId: player.id, playSessionId: ps.id, score: player.score })
        ))
        
        const result = await PlaySession.findByPk(ps.id, {
            include: [
                { 
                    model: User, as: "players", attributes: ["id", "name"], through: { attributes: ["score"] }
                },
                {
                    model: Boardgame,
                    attributes: ["id", "name"]
                }
            ]
        })

        const activity = await createActivity(result)
        
        const responseJSON = {
            playSession: result.toJSON(),
            activity: activity.toJSON(),
        }
        return response.json(responseJSON)

    } catch(error) {
        console.log(error)
        return response.status(400).json({ error })
    }
})

router.delete("/:id", auth, async (request, response) => {
    const id = Number(request.params.id)
    if (!Number.isInteger(id)) {
        return response.sendStatus(404)
    }
    const playSession = await PlaySession.findByPk(id, {
        include: [
            {
                model: User,
                as: "players",
                attributes: ["id"],
                through: {
                    attributes: ["score"]
                }
            }
        ]}
    )
    if (!playSession) {
        return response.sendStatus(404)
    }
    const user = request.user
    const isPlayer = await playSession.hasPlayer(user)
    if (!isPlayer && !user.isAdmin) {
        return response.status(401).json({ error: "Not authorized to delete this playsession" })
    }

    await Player.destroy({ where: { playSessionId: id }})
    await playSession.destroy()

    return response.status(200).json(playSession.toJSON())
})

module.exports = router