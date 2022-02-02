import { useState, useMemo } from "react"
import HeroSection from "../components/HeroSection"
import usePlaySessions from "../hooks/usePlaySessions"
import { Link } from "react-router-dom"
import InputField from "../components/util/InputField"
import SelectInput from "../components/util/SelectInput"
import { ArrowUpIcon, ArrowDownIcon, SearchIcon } from "@heroicons/react/outline"
import { StarIcon } from "@heroicons/react/outline"

const sortOptions = [
    "date", "duration", "players"
]

const sorter = (sortBy) => {
    switch (sortBy) {
        case "duration": return (a, b) => b.duration - a.duration
        case "players": return (a, b) => b.players.length - a.players.length
        default: return (a, b) => new Date(b.date) - new Date(b.date)
    }
}

const PlaySession = ({ playSession }) => {

    const topScore = playSession.players
        .map(p => p.player.score)
        .reduce((top, score) => Math.max(top, score || 0), 0)

    return (
        <div className="flex flex-row items-center">
            <span className="w-20 sm:w-24 md:w-32 text-center text-slate-500 text-xs sm:text-sm tabular-nums">
                {new Date(playSession.date).toLocaleDateString()}
            </span>
            <div className="w-full bg-gradient-to-b from-sky-600/10 to-indigo-600/10 rounded-lg shadow">
                <div className="flex flex-row gap-2 divide-x divide-slate-800 items-stretch">
                    <div className="flex flex-col sm:flex-row gap-2 mr-auto">
                        <div className="flex flex-col gap-1 p-2">
                            <Link to={"/boardgames/" + playSession.boardgame.id}
                                className=" text-slate-300
                                hover:underline underline-offset-1 decoration-2 decoration-dashed decoration-indigo-500"
                            >
                                <h1 className="truncate w-32">
                                    {playSession.boardgame.name}
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

const PlaySessions = () => {

    const { playSessions } = usePlaySessions()

    const [boardgameName, setBoardgameName] = useState("")
    const [sortBy, setSortBy] = useState(sortOptions[0])
    const [desc, setDesc] = useState(true)

    const sortedPlaySessions = useMemo(() => {
        return playSessions?.sort(sorter(sortBy))
    }, [playSessions, sortBy])

    const filteredPlaySessions = useMemo(() => {
        return sortedPlaySessions?.filter(ps => ps.boardgame.name.toLowerCase().includes(boardgameName.toLowerCase()))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortedPlaySessions, boardgameName, sortBy]) // without sortBy dep, doesnt update when sort changes

    // risky: reverse in place a memoized array. It works just fine doe
    const onSortDirChange = () => {
        setDesc(!desc)
        filteredPlaySessions.reverse()
    }

    return (
        <>
        <HeroSection>
            <h1>Playsessions</h1>    
        </ HeroSection>
        <div className="flex flex-row justify-center">
            <div className="flex flex-col w-full md:w-5/6 lg:w-3/4 xl:2/3 gap-4 items-stretch p-1 sm:p-4">
                <div className="flex flex-row items-center space-x-6 py-4">
                    <div className="flex flex-row space-x-1 items-center">
                        <span className="hidden sm:block text-slate-400 text-sm">Sort by</span>
                        <SelectInput value={sortBy} setValue={setSortBy} options={sortOptions}/>
                        <button className="text-slate-400 hover:text-slate-200" onClick={onSortDirChange}>
                            {desc ? <ArrowDownIcon className="w-5 h-5"/> : <ArrowUpIcon className="w-5 h-5"/>}
                        </button>
                    </div>
                    <div>
                        <InputField 
                            value={boardgameName} 
                            onChange={event => setBoardgameName(event.target.value)}
                            placeholder="Search by boardgame"
                            className="bg-slate-800"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2 border-l border-slate-800 pl-1">
                    {filteredPlaySessions?.map(ps => 
                        <PlaySession playSession={ps} key={ps.id} />
                    )}
                </div>
            </div>
        </div>
        </>
    )
}

export default PlaySessions