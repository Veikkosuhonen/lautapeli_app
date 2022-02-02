import { NavLink } from "react-router-dom"
import User from "../User"

const PlaySession = ({ playSession }) => {

    const topScore = playSession.players
        .map(p => p.player.score)
        .reduce((top, score) => Math.max(top, score || 0), 0)
        
    return (
        
        <NavLink to={`/playsessions/${playSession.id}`} key={playSession.id} className="flex flex-col ml-1 p-1 rounded-lg hover:bg-slate-800/30 transition-colors duration-200 delay-100">
            <span className="text-sm text-slate-400 pb-2">
                {new Date(playSession.date).toLocaleString()}
            </span>
            <div className="flex flex-row flex-wrap gap-2">
                {playSession.players && playSession.players.map(player => (
                    <User user={player} winner={player.player.score === topScore} key={player.id} />
                ))}
            </div>
        </NavLink>
    )
}

export default PlaySession