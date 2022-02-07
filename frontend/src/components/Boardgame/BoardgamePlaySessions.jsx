import { useState, useMemo } from "react"
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/outline"
import PlaySessionsList from "../PlaySessionsList"
import SelectInput from "../util/SelectInput"

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

const BoardgamePlaySessions = ({ boardgame }) => {

    const playSessions = boardgame?.playSessions

    const [sortBy, setSortBy] = useState(sortOptions[0])
    const [desc, setDesc] = useState(true)

    const sortedPlaySessions = useMemo(() => {
        return playSessions?.sort(sorter(sortBy))
    }, [playSessions, sortBy])

    // risky: reverse in place a memoized array. It works just fine doe
    const onSortDirChange = () => {
        setDesc(!desc)
        sortedPlaySessions.reverse()
    }

    return (
        <div>
            <div className="flex flex-row items-center space-x-6 py-4">
                <div className="flex flex-row space-x-1 items-center">
                    <span className="text-slate-400 text-sm">Sort by</span>
                    <SelectInput value={sortBy} setValue={setSortBy} options={sortOptions}/>
                    <button className="text-slate-400 hover:text-slate-200" onClick={onSortDirChange}>
                        {desc ? <ArrowDownIcon className="w-5 h-5"/> : <ArrowUpIcon className="w-5 h-5"/>}
                    </button>
                </div>
            </div>
            
            <PlaySessionsList playSessions={sortedPlaySessions} />
        </div>
    )
}

export default BoardgamePlaySessions