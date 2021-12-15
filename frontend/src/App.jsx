import React from 'react'
import axios from 'axios'
import Boardgame from './components/Boardgame'
import { useState, useEffect } from 'react'

const App = () => {

    const [boardgames, setBoardgames] = useState([])
    const [newBg, setNewBg] = useState("")

    useEffect(() => {
        console.log("Getting stuff from server")
        axios.get("http://localhost:3001/api/boardgames")
        .then(response => {
            console.log("Received response")
            setBoardgames(response.data)
        })
        .catch(error => {
            console.log("Error: " + error)
        })
    }, [])

    const postBg = (name) => {
        const bg = { name: name }
        axios.post("http://localhost:3001/api/boardgames", bg)
        .then(response => {
            console.log("Received response to post: " + JSON.stringify(response.data))
            setBoardgames(boardgames.concat(response.data))
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