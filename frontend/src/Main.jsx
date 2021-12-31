import React, { useEffect } from "react"

import Boardgames from './components/Boardgames'
import SelectedBoardgame from './components/SelectedBoardgame'
import ErrorNotification from "./components/ErrorNotification"
import BoardgameForm from './components/BoardgameForm'
import { useNavigate } from "react-router-dom"

const Main = ({
    user,
    errorMessage,
    boardgames,
    selectBg,
    selectedBg,
    addBg,
    addPlaySession,
    showNotification
}) => {
    
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate("/login")
            showNotification("You need to login before accessing the site")
        }
    })

    return (
        <div className="grid grid-cols-1 space-y-2 divide-y divide-slate-600">
            <ErrorNotification message={errorMessage} />
            <Boardgames boardgames={boardgames} onSelect={selectBg} />
            <SelectedBoardgame bg={selectedBg} addPlaySession={addPlaySession}/>
            <BoardgameForm addBg={addBg} />
        </div>
    )
}

export default Main