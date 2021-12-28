import React from "react"

const Boardgame = ({ id, name, onSelect }) => (
    <li>
        {name}
        <button onClick={() => onSelect(id)}>Select</button>
    </li>
)

const Boardgames = ({ boardgames, onSelect }) => (
    <div>
        <h1 class="text-xl text-slate-400">Boardgames</h1>
        <ul>
            {boardgames.map(bg => 
                <Boardgame key={bg.id} id={bg.id} name={bg.name} onSelect={onSelect}/>
            )}
        </ul>
    </div>
)

export default Boardgames