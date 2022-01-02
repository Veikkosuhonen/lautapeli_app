import React, { useEffect } from "react"

import Boardgames from './components/Boardgames'
import SelectedBoardgame from './components/SelectedBoardgame'
import BoardgameForm from './components/BoardgameForm'
import { useNavigate } from "react-router-dom"

const Main = ({
    user,
    boardgames,
    selectBg,
    selectedBg,
    addBg,
    addPlaySession,
    showNotification,
    selectedBgRef,
}) => {
    
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate("/login")
            showNotification("You need to login before accessing the site")
        }
    }, [user, navigate, showNotification])

    return (
        <div className="grid grid-cols-1 space-y-2">
            <BoardgameForm addBg={addBg} />
            <Boardgames boardgames={boardgames} onSelect={selectBg} />
            <SelectedBoardgame bg={selectedBg} addPlaySession={addPlaySession} popupWindowRef={selectedBgRef}/>
        </div>
    )
}

export default Main