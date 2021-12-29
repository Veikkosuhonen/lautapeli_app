import React from "react"

const Boardgame = ({ boardgame, onSelect }) => (
    <div className="rounded border py-4 px-2 bg-slate-800 border-slate-700">
        <div className="grid grid-cols-2 justify-start px-2 space-y-2">
            <div class="col-span-2">
                <button onClick={() => onSelect(boardgame.id)} className="text-xl text-slate-200">{boardgame.name}</button>
            </div>
            <p className="text-slate-500 text-xs">Added {boardgame.dateAdded}</p>
            <p className="text-slate-500 text-xs">Played {boardgame.timesPlayed} times</p>
        </div>
    </div>
)

const Boardgames = ({ boardgames, onSelect }) => (
    <div className="p-2 grid grid-cols-1 gap-y-2">
        <h1 className="text-xl text-slate-400">Boardgames</h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-y-4 gap-x-3">
            {boardgames.map(bg => 
                <Boardgame key={bg.id} boardgame={bg} onSelect={onSelect}/>
            )}
        </div>
    </div>
)

export default Boardgames