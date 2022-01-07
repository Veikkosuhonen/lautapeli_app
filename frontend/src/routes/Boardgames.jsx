import React from "react"

import BoardgamesList from '../components/BoardgamesList'
import BoardgameForm from '../components/BoardgameForm'

const Boardgames = ({
    boardgames,
    addBg,
    onOpenAddForm,
    addBgRef
}) => {

    return (
        <div className="grid grid-cols-1 space-y-2">
            <BoardgamesList boardgames={boardgames} onOpenAddForm={onOpenAddForm}/>
            <BoardgameForm addBg={addBg} popupWindowRef={addBgRef}/>
        </div>
    )
}

export default Boardgames