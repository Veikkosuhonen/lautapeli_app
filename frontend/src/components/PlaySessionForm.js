import React from 'react'
import { useState } from 'react'
import { PrimaryButton } from './Buttons';
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
                <div className="relative flex flex-col space-y-2">
                <Listbox.Options>
                    {users.map((user) => (
                        <Listbox.Option key={user.id} value={user}>
                            <Player user={user} />
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
                </div>
            </Listbox>
            <PrimaryButton content="Add player" onClick={() => { addPlayer(selected) }}/>
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
        <div>
            <form className="flex flex-row space-x-4"
                onSubmit={onSubmit}
            >
                <div className="flex flex-col space-y-2">
                    <DateInput date={date} setDate={setDate}/>
                    <InputField 
                        value={duration} 
                        onChange={(event) => { setDuration(event.target.value) }} 
                        placeholder="duration (min)"
                        type="number"
                    />
                    {players.map(user => <Player user={user}/>)}
                    <PlayerSelector user={user} users={users} addPlayer={(player) => { setPlayers(players.concat(player)) }}/>
                    <PrimaryButton type="submit" content="add playsession" />
                </div>
            </form>
        </div>
    )
}

export default PlaySessionForm