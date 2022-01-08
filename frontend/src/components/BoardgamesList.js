import React from "react"
import Surface from "./Surface"
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
 }) => (
    <div className="grid grid-cols-1 p-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-4 gap-x-3">
        {boardgames.map(bg => 
            <Boardgame key={bg.id} boardgame={bg} onSelect={onSelect}/>
        )}
    </div>
)

export default BoardgamesList