import React, { useRef, useState, useMemo } from "react"

import BoardgamesList from '../components/BoardgamesList'
import Activities from "../components/Activities"
import { SecondaryButton } from "../components/util/Buttons"
import { ArrowDownIcon, ArrowUpIcon, PlusIcon } from "@heroicons/react/outline"
import HeroSection from "../components/HeroSection"
import InputField from "../components/util/InputField"
import SelectInput from "../components/util/SelectInput"
import PopupWindow from "../components/util/PopupWindow"
import NewBoardgame from "./NewBoardgame"
import useBoardgames from "../hooks/useBoardgames"
import useActivities from "../hooks/useActivities"

const sortOptions = [
    "name", "date added", "last played", "times played", "likes"
]

const Boardgames = () => {
    
    const { boardgames } = useBoardgames()
    const { activities } = useActivities()

    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState(sortOptions[0])
    const [desc, setDesc] = useState(true)

    const sortedBoardgames = useMemo(() => {
        const sorter = (a, b) => {
            switch (sortBy) {
                case "date added": return new Date(b.dateAdded) - new Date(a.dateAdded)
                case "last played": {
                    return (new Date(b.playSessions.length > 0 ? b.playSessions[0].date : 0) 
                            - new Date(a.playSessions.length > 0 ? a.playSessions[0].date : 0))
                }
                case "times played": return b.playSessions.length - a.playSessions.length
                case "likes": return b.numLikes - a.numLikes
                default: return ("" + a.name).localeCompare(b.name)
            }
        }

        return boardgames?.sort(sorter)
    }, [boardgames, sortBy])

    const filteredBoardgames = useMemo(() => {
        return sortedBoardgames?.filter(bg => bg.name.toLowerCase().includes(searchTerm.toLowerCase()))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortedBoardgames, searchTerm, sortBy]) // without sortBy dep, doesnt update when sort changes

    // risky: reverse in place a memoized array. It works just fine doe
    const onSortDirChange = () => {
        setDesc(!desc)
        filteredBoardgames.reverse()
    }

    const newBoardgameFormPopupRef = useRef()

    return (
        <>
            <PopupWindow ref={newBoardgameFormPopupRef}>
                <NewBoardgame />
            </PopupWindow>

            <HeroSection>
                <h1>Boardgames</h1>
            </HeroSection>
            <div className="flex flex-col space-y-8 sm:space-y-0 sm:flex-row space-x-2 sm:space-x-6 px-2 sm:px-4 md:px-6">
                <Activities activities={activities}/>
                <div>
                    <div className="flex flex-row items-center space-x-6 pb-4 pt-6 sm:pt-0">
                        <div>
                            <InputField 
                                value={searchTerm} 
                                onChange={event => setSearchTerm(event.target.value)}
                                placeholder="Search..."
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
                        
                        <SecondaryButton content={
                            <div className="flex gap-2 items-center"><PlusIcon className="h-4 w-4"/>Add</div>
                        } onClick={() => newBoardgameFormPopupRef.current.setOpen(true)}/>
                        
                    </div>
                    <BoardgamesList boardgames={filteredBoardgames} />
                </div>
            </div>
        </>
    )
}

export default Boardgames