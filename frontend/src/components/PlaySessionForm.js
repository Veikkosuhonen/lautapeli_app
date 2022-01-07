import React from 'react'
import { useState } from 'react'
import { PrimaryButton, SecondaryButton } from './Buttons';
import InputField from './InputField';
import DateInput from './DateInput';
import { UserIcon } from '@heroicons/react/outline';
import { Listbox } from '@headlessui/react'

const Player = ({ user }) => (
    <div className="border-0 rounded bg-slate-500/20 p-2 align-middle">
        <div className="flex flex-row justify-start px-4 space-x-2">
            <UserIcon className="w-5 h-5 text-slate-400"/>
            <span className="text-sm text-slate-400 font-light">{user.name}</span>
        </div>
    </div>
)

const PlayerSelector = ({ user, users, addPlayer }) => {

    const [selected, setSelected] = useState(user)

    return (
        <div className="flex flex-row items-center space-x-2">
            <Listbox value={selected} onChange={setSelected}>
                <Listbox.Button><Player user={selected} /></Listbox.Button>
                <div className="absolute flex flex-col space-y-2">
                    <Listbox.Options>
                        {users.map((user) => (
                            <Listbox.Option key={user.id} value={user}>
                                <Player user={user} />
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>
            <SecondaryButton content="Add player" onClick={() => { addPlayer(selected) }}/>
        </div>
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
            players
        }
        addPlaySession(playSession)
    }

    return (
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
                    {players.map(user => 
                    <div className="col-span-2">
                        <Player user={user}/>
                    </div>
                    )}
                    <div className="col-span-2">
                        <PlayerSelector user={user} users={users} addPlayer={(player) => { setPlayers(players.concat(player)) }}/>
                    </div>
                    <div className="col-span-2 pt-2">
                        <PrimaryButton type="submit" content="add playsession" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PlaySessionForm