import React from "react"

import BoardgamesList from '../components/BoardgamesList'
import { NavLink, Outlet } from "react-router-dom"
import { PrimaryButton } from "../components/Buttons"
import { PlusIcon } from "@heroicons/react/outline"

const Boardgames = ({
    boardgames,
}) => {
    
    return (
        <div>
            <div className="flex flex-row items-end space-x-2 p-2">
                <h1 className="text-xl font-light text-slate-400">Boardgames</h1>
                <NavLink to="/boardgames/new" >
                    <PrimaryButton content={<PlusIcon className="h-4 w-4 text-slate-800"/>} />
                </NavLink>
            </div>
            <Outlet />
            <BoardgamesList boardgames={boardgames} />
        </div>
    )
}

export default Boardgames