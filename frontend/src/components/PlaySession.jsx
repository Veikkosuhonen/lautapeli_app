import React from "react"
import { StarIcon } from "@heroicons/react/solid"

const PlaySession = ({ playSession }) => {

    const topScore = playSession.players
        .map(p => p.player.score)
        .reduce((top, score) => Math.max(top, score || 0), 0)
    
    return (
        
        <li key={playSession.id} className="flex flex-col pl-2 border-l-2 border-slate-700 transition duration-200
        hover:border-indigo-500">
            <div className="flex flex-col py-2"> 
                <span className="text-xs text-slate-500">
                    {new Date(playSession.date).toLocaleString()}
                </span>
                <span className="text-slate-400">
                    Played {playSession.duration} minutes
                </span>
            </div>
            <div className="flex flex-row space-x-2">
                {playSession.players && playSession.players.map(player => (
                    <div key={player.id} className="flex flex-row items-center bg-slate-700 p-1 rounded text-slate-400">
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