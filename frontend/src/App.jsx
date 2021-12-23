import React from 'react'
import { useState, useEffect } from 'react'
import bgService from './services/bgService'
import playSessionService from './services/playSessionService'

import Boardgames from './components/Boardgames'
import SelectedBoardgame from './components/SelectedBoardgame'
import ErrorNotification from "./components/ErrorNotification"

const App = () => {

    const [boardgames, setBoardgames] = useState([])
    const [newBg, setNewBg] = useState("")
    const [selectedBg, setSelectedBg] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        console.log("Getting stuff from server")
        bgService.getAll().then(bgs => {
            console.log("Received response")
            setBoardgames(bgs)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const selectBg = (id) => {
        bgService.getOne(id).then(bg => {
            setSelectedBg(bg)
            console.log("Selected " + bg)
        }).catch(error => {
            console.log(error)
        })
    }

    const postBg = (name) => {
        const bg = { name: name }
        bgService.post(bg).then(bg => {
            console.log("Received response to post: " + JSON.stringify(bg))
            setBoardgames(boardgames.concat(bg))
        }).catch(_error => {
            setErrorMessage(`"${name}" already exists!`)
        })
    }

    const addBg = (event) => {
        event.preventDefault()
        console.log("Adding " + newBg)
        postBg(newBg)
    }

    const addPlaySession = (playSession) => {
        console.log("Adding " + playSession)
        playSessionService.post(playSession).then(ps => {
            setSelectedBg({
                ...selectedBg, 
                playSessions: selectedBg.playSessions.concat(ps)
            })
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
            <ErrorNotification message={errorMessage} />
            <Boardgames boardgames={boardgames} onSelect={selectBg} />
            <form onSubmit={addBg}>
                <input value={newBg} onChange={event => {setNewBg(event.target.value)}}/>
                <button type="submit">add</button>
            </form>
            <SelectedBoardgame bg={selectedBg} addPlaySession={addPlaySession}/>
        </div>
    )
}

export default App