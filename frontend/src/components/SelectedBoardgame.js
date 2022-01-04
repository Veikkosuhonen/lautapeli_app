import React from 'react'
import { useState } from 'react'
import { PrimaryButton } from './Buttons';
import InputField from './InputField';
import PopupWindow from "./PopupWindow"
import PlaySession from './PlaySession';

const PlaySessionForm = ({onChange, playsession, onSubmit}) => (
    <div>
        <form className="flex flex-row space-x-4"
        onSubmit={(event) => {event.preventDefault(); onSubmit()}}>
            <div>
                <InputField 
                value={playsession.duration} 
                onChange={onChange} 
                placeholder="duration (min)"
                type="number"/>
            </div>
            <PrimaryButton type="submit" content="add playsession" />
        </form>
    </div>
)

const SelectedBoardgame = ({
    bg, 
    addPlaySession, 
    popupWindowRef
}) => {
    const [newPlaySession, setNewPlaySession] = useState({})

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

    return (
        <PopupWindow ref={popupWindowRef} title={bg && bg.name}>
            <PlaySessionForm onChange={onPlaySessionChange} playsession={newPlaySession} onSubmit={onPlaySessionFormSubmit}/>
            <ul className="text-slate-400 font-light">
                {bg && bg.playSessions.length !== 0 && bg.playSessions.map(ps => 
                    <PlaySession key={ps.id} playSession={ps}/>
                )}
            </ul>
            {bg && bg.playSessions.length === 0 &&
                <p className="text-sm text-slate-500">Not yet played</p>
            }
        </PopupWindow>
    )
}

export default SelectedBoardgame