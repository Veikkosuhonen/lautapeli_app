import React from 'react'
import { useState } from 'react'
import { PrimaryButton } from './Buttons';
import InputField from './InputField';
import DateInput from './DateInput';
import Surface from "./Surface"
import Select from "react-select"

const ScoreInput = (
    {value, onChange, ...props}
) => {

    return (
        <div className="">
            <input 
                value={value}
                onChange={onChange}
                type="number"
                placeholder="0"
                className="rounded bg-slate-600 p-1 my-2 focus:outline-none text-center w-28"
                onBlur={props["onBlur"]}
            />
        </div>
    )
}

const PlayerSelector = ({ 
    users,
    onChange
 }) => {

    const options = users.map(user => ({
        value: user,
        label: user.name
    }))

    const styles = {
        input: (styles, {data}) => ({
            ...styles,
            color: "rgb(148 163 184)",
        }),
        control: (styles, {data}) => ({
            ...styles,
            backgroundColor: undefined,
        }),
        menu: (styles, {data}) => ({
            ...styles,
            backgroundColor: "rgb(51 65 81)",
        }),
        option: (styles, {data, isFocused, isDisabled, isSelected}) => ({
            ...styles,
            backgroundColor: isFocused ? "rgb(71 85 105)": "rgb(51 65 81)",
        }),
        multiValue: (styles, {data}) => ({
            ...styles,
            backgroundColor: "rgb(51 65 81)",
            borderRadius: "4px"
        }),
        multiValueLabel: (styles, {data}) => ({
            ...styles,
            color: "rgb(148 163 184)"
        })
    }

    return (
        <Select 
            options={options}
            onChange={(values) => onChange(values)}
            placeholder="Select players"
            isMulti
            escapeClearsValue={false}
            backspaceRemovesValue={false}
            blurInputOnSelect
            isClearable={false}
            menuPlacement="auto"
            styles={styles}
        />
    )
}

const PlaySessionForm = ({
    users, boardgame, addPlaySession
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
            players: players.map(p => ({ id: p.id, score: p.score }))
        }
        addPlaySession(playSession)
    }
    
    const onPlayersChange = (usersSelected) => {
        const newPlayers = usersSelected
            .filter(u => ( // filter out the users already in the session
                !players.some(player => player.id === u.value.id)
            ))
            .map(u => ({ // convert to player objects
                id: u.value.id,
                name: u.value.name, 
                score: 0
        }))
        setPlayers(players
            .filter(p => usersSelected.some(u => u.value.id === p.id)) // remove those that are not selected
            .concat(newPlayers)
        )
    }

    const onScoreChange = (id, score) => {
        setPlayers(players.map(p => 
            p.id === id 
            ? {...p, score}
            : p
        ))
    }

    const onScoreFocusLoss = () => { // sort players by score
        setPlayers(players.slice().sort((a, b) => b.score - a.score))
    }

    return (
        <Surface className="flex flex-col space-y-3">
            <h1 className="text-lg text-slate-400 pb-2">New playsession</h1>
            <form onSubmit={onSubmit}>
                <div className="grid grid-cols-3 gap-2 items-center text-slate-500">

                    <span>Date</span>
                    <div className="col-span-2">
                        <DateInput date={date} setDate={setDate}/>
                    </div>

                    <span>Duration</span>
                    <div className="col-span-2">
                        <InputField 
                            value={duration} 
                            onChange={(event) => { setDuration(event.target.value) }} 
                            placeholder="duration (min)"
                            type="number"
                        />
                    </div>

                    <span className="pt-4 text-slate-400">Select players</span>
                    <div className="col-span-3 text-sm text-slate-400 font-light max-w-sm pb-2">
                        <PlayerSelector users={users} onChange={onPlayersChange}/>
                    </div>

                    {players.length > 0 && 
                    <div className="col-span-3 space-y-2">
                        <div className="grid grid-cols-2 items-center
                        uppercase text-slate-500 text-xs">
                            <span>Player</span>
                            <span>Score</span>
                        </div>
                        {players.map(player => 
                            <div key={player.id} className="grid grid-cols-2 items-center  
                            text-slate-400 py-1 px-2 rounded bg-slate-700">
                                <div>{player.name}</div>
                                <div>
                                    <ScoreInput 
                                        value={player.score} 
                                        onChange={(event) => { onScoreChange(player.id, event.target.value)}}
                                        onBlur={onScoreFocusLoss}
                                    />
                                </div>
                            </div>
                        )} 
                            
                    </div>
                    }

                    <div className="col-span-3 pt-4">
                        <PrimaryButton type="submit" content="add playsession" />
                    </div>
                </div>
            </form>
        </Surface>
    )
}

export default PlaySessionForm