import React from 'react'
import { useState } from 'react'
import PlaySession from './PlaySession'
import PlaySessionForm from './PlaySessionForm'

const SelectedBoardgame = ({ bg, addPlaySession }) => {
    const [newPlaySession, setNewPlaySession] = useState({duration: 0})

    const onPlaySessionChange = (event) => {
        event.preventDefault()
        setNewPlaySession({
            duration: event.target.value
        })
    }

    const onPlaySessionFormSubmit = () => {
        addPlaySession({
            boardgameId: bg.id,
            duration: newPlaySession.duration
        })
    }

    if (bg) {
        if (bg.playSessions.length !== 0) {
            return (
                <div>
                    <h3>{bg.name}</h3>
                    <ul>
                        {bg.playSessions.map(ps => 
                            <PlaySession key={ps.id} id={ps.id} date={ps.date} duration={ps.duration}/>
                        )}
                    </ul>
                    <PlaySessionForm onChange={onPlaySessionChange} playsession={newPlaySession} onSubmit={onPlaySessionFormSubmit}/>
                </div>
            )
        } else {
            return (
                <div>
                    <h3>{bg.name}</h3>
                    <p>Not yet played!</p>
                    <PlaySessionForm onChange={onPlaySessionChange} playsession={newPlaySession} onSubmit={onPlaySessionFormSubmit}/>
                </div>
            )
        }
       
    } else return (
        <div>Nothing selected</div>
    )
}

export default SelectedBoardgame