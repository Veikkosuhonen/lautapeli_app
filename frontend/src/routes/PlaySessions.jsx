import HeroSection from "../components/HeroSection"
import usePlaySessions from "../hooks/usePlaySessions"
import User from "../components/User"
import { Link } from "react-router-dom"

const PlaySession = ({ playSession }) => {

    const topScore = playSession.players
        .map(p => p.player.score)
        .reduce((top, score) => Math.max(top, score || 0), 0)

    return (
        <div className="w-full bg-gradient-to-b from-sky-600/10 to-indigo-600/10 rounded shadow border-l-2 border-transparent hover:border-indigo-600">
            <div className="flex flex-row gap-2 divide-x divide-slate-700 place-items-center items-stretch">
                <div className="flex flex-col gap-2 p-2">
                    <div className="flex flex-row items-end gap-4">
                        <span className="text-slate-500 text-sm tabular-nums">
                            {new Date(playSession.date).toLocaleString()}
                        </span>
                        
                        <Link to={"/boardgames/" + playSession.boardgame.id}
                            className=" text-slate-500 
                            hover:underline underline-offset-1 decoration-2 decoration-dashed decoration-indigo-500"
                        >
                            <h1 className="truncate w-48">
                                {playSession.boardgame.name}
                            </h1>
                        </Link>
                    </div>
                    <div className="flex flex-row gap-2">
                        {playSession.players?.map(player => 
                            <User user={player} winner={player.player.score === topScore} key={player.id}/>
                        )}
                    </div>
                </div>
                <Link to={"/playsessions/" + playSession.id}
                    className="text-center overflow-hidden flex-grow text-indigo-700 hover:text-slate-100 hover:bg-indigo-700 transition-colors ease-in duration-150 rounded-r"
                >
                    Details
                </Link>
            </div>
        </div>
    )
}

const PlaySessions = () => {

    const { playSessions } = usePlaySessions()

    return (
        <>
        <HeroSection>
            <h1>Playsessions</h1>    
        </ HeroSection>
        <div className="flex flex-row justify-center">
            <div className="flex flex-col items-stretch gap-2 p-4 w-full md:w-2/3 lg:w-1/2">
                {playSessions?.map(ps => 
                    <PlaySession playSession={ps} key={ps.id} />
                )}
            </div>
        </div>
        </>
    )
}

export default PlaySessions