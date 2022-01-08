import React from "react"

import BoardgamesList from '../components/BoardgamesList'
import { NavLink, Outlet } from "react-router-dom"
import { PrimaryButton } from "../components/Buttons"
import { PlusIcon } from "@heroicons/react/outline"

const Boardgames = ({
    boardgames,
}) => {
    
    return (
        <div className="grid grid-cols-1 space-y-2">
            <div className="flex flex-row pl-4 space-x-4 py-4 items-center">
                <h1 className="text-2xl font-light text-slate-400">Boardgames</h1>
                <NavLink to="/boardgames/new" >
                    <PrimaryButton content={<PlusIcon className="h-5 w-5 text-slate-800"/>} />
                </NavLink>
            </div>
            <Outlet />
            <BoardgamesList boardgames={boardgames} />
        </div>
    )
}

export default Boardgames