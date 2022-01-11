import React from "react"

const PlaySession = ({ playSession }) => {
    return (
        
        <li key={playSession.id} className="flex flex-col mb-1 p-2 bg-slate-700 rounded">
            <div className="inline">
                Played 
                <span className="text-sm text-slate-500">
                    {new Date(playSession.date).toDateString()}
                </span>, 
                {playSession.duration} minutes
            </div>
            <div className="flex flex-row space-x-1">
                {playSession.players && playSession.players.map(player => (
                    <div className="bg-slate-600 p-1 rounded">
                        {player.name}
                    </div>
                ))}
            </div>
        </li>
    )
}

export default PlaySession