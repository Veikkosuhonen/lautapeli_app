import React from "react"
import User from "./User"

const PlaySession = ({ playSession }) => {

    const topScore = playSession.players
        .map(p => p.player.score)
        .reduce((top, score) => Math.max(top, score || 0), 0)
    
    return (
        
        <li key={playSession.id} className="flex flex-col pl-2 transition duration-20">
            <div className="flex flex-col pb-1"> 
                <span className="text-xs text-slate-500">
                    {new Date(playSession.date).toLocaleString()}
                </span>
                <span className="text-slate-400">
                    Played {playSession.duration} minutes
                </span>
            </div>
            <div className="flex flex-row flex-wrap gap-2">
                {playSession.players && playSession.players.map(player => (
                    <User user={player} score={player.player.score} winner={player.player.score === topScore} key={player.id} />
                ))}
            </div>
        </li>
    )
}

export default PlaySession