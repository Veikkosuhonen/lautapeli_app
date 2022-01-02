import React from 'react'
import { useState } from 'react'
import { PrimaryButton } from './Buttons';
import InputField from './InputField';
import Surface from './Surface';

const PlaySession = ({ id, date, duration }) => (
    <li key={id}>
        Played <span className="text-sm text-slate-500">{new Date(date).toDateString()}</span>, {duration} minutes
    </li>
)

const PlaySessionForm = ({onChange, playsession, onSubmit}) => (
    <div>
        <form className="flex flex-row space-x-4"
        onSubmit={(event) => {event.preventDefault(); onSubmit()}}>
            <InputField 
            value={playsession.duration} 
            onChange={onChange} 
            placeholder="duration (min)"
            type="number"/>
            <PrimaryButton type="submit" text="add playsession" />
        </form>
    </div>
)

const SelectedBoardgame = ({ bg, addPlaySession }) => {
    const [newPlaySession, setNewPlaySession] = useState("")

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
                <div className="p-2">
                <Surface>
                    <h3 className="text-slate-200 text-xl">{bg.name}</h3>
                    <ul className="text-slate-400 font-light">
                        {bg.playSessions.map(ps => 
                            <PlaySession key={ps.id} id={ps.id} date={ps.date} duration={ps.duration}/>
                        )}
                    </ul>
                    <PlaySessionForm onChange={onPlaySessionChange} playsession={newPlaySession} onSubmit={onPlaySessionFormSubmit}/>
                </Surface>
                </div>
            )
        } else {
            return (
                <div className="p-2">
                <Surface>
                <h3 className="text-slate-200 text-xl">{bg.name}</h3>
                    <p className="text-slate-400 font-light">Not yet played!</p>
                    <PlaySessionForm onChange={onPlaySessionChange} playsession={newPlaySession} onSubmit={onPlaySessionFormSubmit}/>
                </Surface>
                </div>
            )
        }
       
    } else return (
        <div className="p-2">
        </div>
    )
}

export default SelectedBoardgame