import React from 'react'
import { useState } from 'react'

const PlaySession = ({ id, date, duration }) => (
    <li key={id}>
        {date}, {duration} minutes
    </li>
)

const PlaySessionForm = ({onChange, playsession, onSubmit}) => (
    <div>
        <form onSubmit={(event) => {event.preventDefault(); onSubmit()}}>
                <input value={playsession.duration} onChange={onChange}/>
                <button type="submit">add</button>
            </form>
    </div>
)

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