import { useState, useMemo } from "react"
import HeroSection from "../components/HeroSection"
import usePlaySessions from "../hooks/usePlaySessions"
import PlaySessionsList from "../components/PlaySessionsList"
import InputField from "../components/util/InputField"
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/outline"
import SelectInput from "../components/util/SelectInput"

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
            <h1>Game log</h1>    
        </ HeroSection>
        <div className="flex flex-row justify-center">
            <div className="flex flex-col w-full md:w-5/6 lg:w-2/3 xl:1/2 gap-4 items-stretch p-1 sm:p-4">
                <div className="flex flex-row items-center space-x-6 py-4">
                    <div>
                        <InputField 
                            value={boardgameName} 
                            onChange={event => setBoardgameName(event.target.value)}
                            placeholder="Search by boardgame"
                            className="bg-slate-800"
                        />
                    </div>
                    <div className="flex flex-row space-x-1 items-center">
                        <span className="hidden sm:block text-slate-400 text-sm">Sort by</span>
                        <SelectInput value={sortBy} setValue={setSortBy} options={sortOptions}/>
                        <button className="text-slate-400 hover:text-slate-200" onClick={onSortDirChange}>
                            {desc ? <ArrowDownIcon className="w-5 h-5"/> : <ArrowUpIcon className="w-5 h-5"/>}
                        </button>
                    </div>
                </div>
                
                <PlaySessionsList playSessions={filteredPlaySessions} />
            </div>
        </div>
        </>
    )
}

export default PlaySessions