import React from "react"
import { PrimaryButton } from "./Buttons"
import Surface from "./Surface"
import { PlusIcon } from "@heroicons/react/solid"
import { Link } from "react-router-dom"

const Boardgame = ({ boardgame }) => (
    <Surface className="
    border-l-4 border-slate-800
    transition duration-200
    hover:border-indigo-500">
        <div className="grid grid-cols-2 justify-start px-2 gap-x-4 space-y-2">
            <div className="col-span-2">
                <Link to={"/boardgames/" + boardgame.id}
                    className="text-xl text-slate-200 
                    hover:underline underline-offset-2 decoration-4 decoration-dashed decoration-indigo-600"
                >
                    {boardgame.name}
                </Link>
            </div>
            <p className="text-slate-500 text-xs">Added {boardgame.dateAdded} {boardgame.addedBy && boardgame.addedBy.name}</p>
            <p className="text-slate-500 text-xs">Played {boardgame.timesPlayed} times</p>
        </div>
    </Surface>
)

const BoardgamesList = ({ 
    boardgames, onSelect,
    onOpenAddForm
 }) => (
    <div className="p-2 flex flex-col">
        <div className="flex flex-row pl-4 space-x-4 py-4 items-center">
            <h1 className="text-2xl font-light text-slate-400">Boardgames</h1>
            <PrimaryButton content={<PlusIcon className="h-5 w-5 text-slate-800"/>} onClick={onOpenAddForm} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-4 gap-x-3">
            {boardgames.map(bg => 
                <Boardgame key={bg.id} boardgame={bg} onSelect={onSelect}/>
            )}
        </div>
    </div>
)

export default BoardgamesList