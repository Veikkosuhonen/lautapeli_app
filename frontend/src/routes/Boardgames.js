import React, { useState } from "react"

import BoardgamesList from '../components/BoardgamesList'
import Activities from "../components/Activities"
import { NavLink, Outlet } from "react-router-dom"
import { Listbox, Transition } from "@headlessui/react"
import { SecondaryButton } from "../components/Buttons"
import { ArrowDownIcon, ArrowUpIcon, PlusIcon } from "@heroicons/react/outline"
import HeroSection from "../components/HeroSection"
import InputField from "../components/InputField"

const sortOptions = [
    "name", "date added", "last played"
]

const Selector = ({ value, setValue }) => {
    return (
        <div className="text-slate-300">
            <Listbox value={value} onChange={setValue}>
                <Listbox.Button className="py-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-700">{value}</Listbox.Button>
                <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                ></Transition>
                <Listbox.Options className="absolute z-10 bg-slate-800 shadow-md rounded border border-slate-700">
                    {sortOptions.map((option, idx) => (
                    <Listbox.Option
                        className="hover:bg-slate-700 select-none cursor-default p-2"
                        key={idx}
                        value={option}
                    >
                        {option}
                    </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    )
}

const Boardgames = ({
    boardgames, activities
}) => {
    
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState(sortOptions[0])
    const [desc, setDesc] = useState(true)

    const sorter = (a, b) => {
        switch (sortBy) {
            case "date added": return new Date(b.dateAdded) - new Date(a.dateAdded)
            case "last played": {
                return (new Date(b.playSessions.length > 0 ? b.playSessions[0].date : 0) 
                        - new Date(a.playSessions.length > 0 ? a.playSessions[0].date : 0))
            }
            default: return ("" + a.name).localeCompare(b.name)
        }
    }

    const getBoardgames = () => boardgames
        .filter(bg => bg.name.includes(searchTerm))
        .sort(desc ? sorter : (a, b) => sorter(b, a))

    return (
        <div>
            <HeroSection>
                <h1>Boardgames</h1>
            </HeroSection>
            <div className="flex flex-col space-y-8 sm:space-y-0 sm:flex-row space-x-2 sm:space-x-6 px-1 sm:px-2">
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
                            <Selector value={sortBy} setValue={setSortBy}/>
                            <button className="text-slate-400 hover:text-slate-200" onClick={(event) => setDesc(!desc)}>
                                {desc ? <ArrowDownIcon className="w-5 h-5"/> : <ArrowUpIcon className="w-5 h-5"/>}
                            </button>
                        </div>
                        <NavLink to="/boardgames/new" >
                            <SecondaryButton content={<PlusIcon className="h-4 w-4"/>} />
                        </NavLink>
                    </div>
                    <Outlet />
                    <BoardgamesList boardgames={getBoardgames(boardgames)} />
                </div>
            </div>
        </div>
    )
}

export default Boardgames