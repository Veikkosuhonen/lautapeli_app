import React from "react"
import Boardgame from "./Boardgame"

const Boardgames = ({ boardgames, onSelect }) => (
    <div>
        <h1>Boardgames</h1>
        <ul>
            {boardgames.map(bg => 
                <Boardgame key={bg.id} id={bg.id} name={bg.name} onSelect={onSelect}/>
            )}
        </ul>
    </div>
)

export default Boardgames