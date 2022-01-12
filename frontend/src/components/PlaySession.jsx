import React from "react"
import { StarIcon } from "@heroicons/react/solid"

const PlaySession = ({ playSession }) => {

    const topScore = playSession.players
        .map(p => p.player.score)
        .reduce((top, score) => Math.max(top, score || 0), 0)
    
    return (
        
        <li key={playSession.id} className="flex flex-col mb-2 p-2">
            <div className="inline py-2">
                Played 
                <span className="text-sm text-slate-500">
                    {new Date(playSession.date).toDateString()}
                </span>, 
                {playSession.duration} minutes
            </div>
            <div className="flex flex-row space-x-1">
                {playSession.players && playSession.players.map(player => (
                    <div key={player.id} className="flex flex-row  items-center bg-slate-700 p-1 rounded">
                        {player.player.score === topScore && 
                            <StarIcon className="w-5 h-5 text-orange-500" />
                        }
                        {player.name} {player.player.score}
                    </div>
                ))}
            </div>
        </li>
    )
}

export default PlaySession