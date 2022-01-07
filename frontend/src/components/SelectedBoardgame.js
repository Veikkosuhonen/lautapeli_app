import React from 'react'
import PopupWindow from "./PopupWindow"
import PlaySession from './PlaySession';
import PlaySessionForm from './PlaySessionForm';

const SelectedBoardgame = ({
    bg,
    user,
    users,
    addPlaySession, 
    popupWindowRef
}) => {

    return (
        <PopupWindow ref={popupWindowRef} title={bg && bg.name}>
            <PlaySessionForm user={user} boardgame={bg} addPlaySession={addPlaySession} users={users}/>
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