import React, { useEffect } from "react"

import Boardgames from './components/Boardgames'
import SelectedBoardgame from './components/SelectedBoardgame'
import BoardgameForm from './components/BoardgameForm'
import { useNavigate } from "react-router-dom"

const Main = ({
    user,
    users,
    boardgames,
    selectBg,
    selectedBg,
    addBg,
    addPlaySession,
    showNotification,
    selectedBgRef,
    onOpenAddForm,
    addBgRef
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
            <Boardgames boardgames={boardgames} onSelect={selectBg} onOpenAddForm={onOpenAddForm}/>
            <BoardgameForm addBg={addBg} popupWindowRef={addBgRef}/>
            <SelectedBoardgame user={user} bg={selectedBg} users={users} addPlaySession={addPlaySession} popupWindowRef={selectedBgRef}/>
        </div>
    )
}

export default Main