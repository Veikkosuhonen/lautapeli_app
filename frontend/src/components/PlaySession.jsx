import { Link } from "react-router-dom"
import { SearchIcon, StarIcon } from "@heroicons/react/outline"
import styles from "../util/styles"

const PlaySession = ({ playSession }) => {

    const topScore = playSession.players
        .map(p => p.player.score)
        .reduce((top, score) => Math.max(top, score || 0), 0)

    return (
        <div className="flex flex-row items-center">
            <span className="w-20 sm:w-24 md:w-32 text-center text-slate-500 text-xs sm:text-sm tabular-nums">
                {new Date(playSession.date).toLocaleDateString("fi")}
            </span>
            <div className="w-full bg-gradient-to-b from-sky-600/10 to-indigo-600/10 rounded-lg shadow">
                <div className="flex flex-row gap-2 divide-x divide-slate-700 items-stretch">
                    <div className="flex flex-col sm:flex-row gap-2 mr-auto">
                        <div className="flex flex-col gap-1 p-2">
                            <Link to={"/boardgames/" + playSession.boardgame?.id} className={styles.boardgameTitle}>
                                <h1 className="truncate w-48 sm:w-40 lg:w-52 xl:w-64">
                                    {playSession.boardgame?.name}
                                </h1>
                            </Link>
                            <span className="text-slate-400 text-sm tabular-nums">
                                {playSession.duration} minutes
                            </span>
                        </div>
                        <div className="flex flex-row flex-wrap self-start gap-x-2 pb-2 sm:pt-2 px-1">
                            {playSession.players?.map(player => 
                                <div key={player.id} className="flex flex-row">
                                    {player.player.score === topScore && <StarIcon className="w-4 h-4 self-center text-orange-500"/>}
                                    <span className="text-slate-400 text-sm font-mono">{player.name}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <Link to={"/playsessions/" + playSession.id}
                        className="flex flex-row gap-2 basis-1/6 
                        items-center justify-center
                        text-slate-400 text-sm 
                        hover:text-slate-100 bg-slate-800/20 hover:bg-indigo-700/50 transition-colors ease-out duration-100 rounded-r-md shadow-inner"
                    >
                        <span className="hidden sm:block">Details</span> <SearchIcon className="w-5 h-5"/>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PlaySession