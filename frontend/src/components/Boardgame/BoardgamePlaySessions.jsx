import { useState, useMemo, useRef } from "react"
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/outline"
import PlaySessionsList from "../PlaySessionsList"
import SelectInput from "../util/SelectInput"
import PopupWindow from "../util/PopupWindow"
import PlaySessionForm from "./PlaySessionForm"
import Button from "../util/Buttons"
import { PlusIcon } from "@heroicons/react/outline"

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


    const playSessionFormPopupRef = useRef()

    return (
        <div>
            <PopupWindow ref={playSessionFormPopupRef}>
                <PlaySessionForm boardgame={boardgame}/>
            </PopupWindow>
            <div className="flex flex-row gap-1 items-center pt-4 pb-6">
                <span className="text-slate-400 text-sm">Sort by</span>
                <SelectInput value={sortBy} setValue={setSortBy} options={sortOptions}/>
                <button className="text-slate-400 hover:text-slate-200 mr-auto" onClick={onSortDirChange}>
                    {desc ? <ArrowDownIcon className="w-5 h-5"/> : <ArrowUpIcon className="w-5 h-5"/>}
                </button>
                <Button onClick={() => playSessionFormPopupRef.current.setOpen(true)} variant={"secondary"}> 
                    <PlusIcon className="h-4 w-4"/>Add playsession
                </Button>
            </div>
            
            <PlaySessionsList playSessions={sortedPlaySessions} />
        </div>
    )
}

export default BoardgamePlaySessions