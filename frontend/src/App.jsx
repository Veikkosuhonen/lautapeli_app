import React from 'react'
import Boardgame from './components/Boardgame'
import { useState, useEffect } from 'react'
import bgService from './services/bgService'

const App = () => {

    const [boardgames, setBoardgames] = useState([])
    const [newBg, setNewBg] = useState("")

    useEffect(() => {
        console.log("Getting stuff from server")
        bgService.getAll()
        .then(bgs => {
            console.log("Received response")
            setBoardgames(bgs)
        })
        .catch(error => {
            console.log("Error: " + error)
        })
    }, [])

    const postBg = (name) => {
        const bg = { name: name }
        bgService.post(bg)
        .then(bg => {
            console.log("Received response to post: " + JSON.stringify(bg))
            setBoardgames(boardgames.concat(bg))
        })
        .catch(error => {
            console.log("Error: " + error)
        })
    }

    const addBg = (event) => {
        event.preventDefault()
        console.log("Adding " + newBg)
        postBg(newBg)
    }

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {boardgames.map(bg => 
                    <Boardgame id={bg.id} name={bg.name}/>
                )}
            </ul>
            <form onSubmit={addBg}>
                <input value={newBg} onChange={event => {setNewBg(event.target.value)}}/>
                <button type="submit">add</button>
            </form>
        </div>
    )
}

export default App