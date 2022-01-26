import React from "react"
import User from "./User"
import OptionsDropDown from "./util/OptionsDropdown"
import DeleteButton from "./DeleteButton"

const PlaySession = ({ playSession, handleDelete, user }) => {

    const topScore = playSession.players
        .map(p => p.player.score)
        .reduce((top, score) => Math.max(top, score || 0), 0)
    
    const canDelete = playSession.players.some(player => player.id === user?.id) || user?.isAdmin
    
    return (
        
        <li key={playSession.id} className="flex flex-col ml-1 p-1 rounded-lg hover:bg-slate-800/30 transition-colors duration-200 delay-100">
            <div className="flex flex-col pb-1">
                <div className="flex flex-nowrap">
                    <div className="flex flex-col mr-auto">
                        <span className="text-xs text-slate-500">
                            {new Date(playSession.date).toLocaleString()}
                        </span>
                        <span className="text-slate-400">
                            Played {playSession.duration} minutes
                        </span>
                    </div>
                    <OptionsDropDown>
                        <DeleteButton onClick={() => handleDelete(playSession)} disabled={!canDelete}/>
                    </OptionsDropDown>
                </div>
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