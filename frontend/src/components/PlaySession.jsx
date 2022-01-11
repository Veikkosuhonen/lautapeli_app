import React from "react"

const PlaySession = ({ playSession }) => {
    return (
        
        <li key={playSession.id}>
            Played <span className="text-sm text-slate-500">
                {new Date(playSession.date).toDateString()}</span>, {playSession.duration} minutes
        </li>
    )
}

export default PlaySession