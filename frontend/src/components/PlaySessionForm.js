import React from 'react'
import { useState } from 'react'
import { PrimaryButton } from './Buttons';
import InputField from './InputField';
import DateInput from './DateInput';
import Surface from "./Surface"
import { UserIcon, XIcon } from '@heroicons/react/outline';
import Select from "react-select"

const SelectedPlayer = ({ 
    user, 
    onRemove
}) => (
    <div className="border-0 rounded bg-slate-500/20 p-2 align-middle">
        <div className="flex flex-row justify-start px-4 space-x-2">
            <UserIcon className="w-5 h-5 text-slate-400"/>
            <span className="text-sm text-slate-400 font-light">{user.name}</span>
            <button onClick={() => onRemove(user)} type="button">
                <XIcon className="w-5 h-5 text-slate-500 hover:text-slate-300" />
            </button>
        </div>
    </div>
)

const PlayerSelector = ({ 
    users, 
    onChange
 }) => {

    const options = users.map(user => ({value: user, label: user.name}))

    return (
        <Select 
            options={options}
            onChange={(values) => onChange(values)}
            isMulti
            classNamePrefix="bg-slate-700"
        />
    )
}

const PlaySessionForm = ({
    user, users, boardgame, addPlaySession
}) => {

    const [duration, setDuration] = useState(0)
    const [date, setDate] = useState(new Date())
    const [players, setPlayers] = useState([])

    const onSubmit = (event) => {
        event.preventDefault()
        const playSession = {
            boardgameId: boardgame.id,
            duration,
            date,
            players: players.map(user => user.id)
        }
        addPlaySession(playSession)
    }

    const onPlayersChange = (players) => {
        setPlayers(players.map(p => p.value))
    }
    console.log(JSON.stringify(players))

    return (
        <Surface>
            <div className="flex flex-col space-y-3">
                <h1 className="text-lg text-slate-400">New playsession</h1>
                <form onSubmit={onSubmit}>
                    <div className="grid grid-cols-2 gap-2 items-center text-slate-500">
                        <span>Date</span>
                        <DateInput date={date} setDate={setDate}/>
                        <span>Duration</span>
                        <InputField 
                            value={duration} 
                            onChange={(event) => { setDuration(event.target.value) }} 
                            placeholder="duration (min)"
                            type="number"
                        />
                        <span>Players</span>
                        <div className="col-span-2">
                            <PlayerSelector users={users} players={players} onChange={onPlayersChange}/>
                        </div>
                        {players.map(user => 
                        <div className="col-span-2">
                            <SelectedPlayer user={user}/>
                        </div>
                        )}
                        <div className="col-span-2 pt-2">
                            <PrimaryButton type="submit" content="add playsession" />
                        </div>
                    </div>
                </form>
            </div>
        </Surface>
    )
}

export default PlaySessionForm