import React from 'react'
import { useState } from 'react'
import { PrimaryButton } from './util/Buttons';
import InputField from './util/InputField';
import DateInput from './util/DateInput';
import Surface from "./util/Surface"
import Select from "react-select"
import { StarIcon } from '@heroicons/react/solid';
import { validation } from "../util/validation"

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
                className="rounded bg-slate-700 p-1 my-2 focus:outline-none text-center w-20 font-serif text-orange-500"
                onBlur={props["onBlur"]}
            />
        </div>
    )
}

const PlayerSelector = ({ 
    users,
    players,
    setPlayers
 }) => {

    const options = users
        .filter(u => !players.some(p => p.id === u.id))
        .map(user => ({
            value: { id: user.id, name: user.name, score: 0 },
            label: user.name
        }))
    
    const value = players.map(p => ({ 
        value: p,
        label: p.name
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
            value={value}
            options={options}
            onChange={(values) => setPlayers(values.map(p => p.value))}
            placeholder="Select players"
            isMulti
            escapeClearsValue={false}
            backspaceRemovesValue={false}
            blurInputOnSelect
            isClearable={false}
            menuPlacement="top"
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
    const [durationValid, setDurationValid] = useState(false)

    const onSubmit = (event) => {
        event.preventDefault()
        const playSession = {
            boardgameId: boardgame.id,
            duration,
            date,
            players: players.map(p => ({ id: p.id, score: p.score }))
        }
        addPlaySession(playSession, () => {
            // on success:
            setDuration(0)
            setDate(new Date())
            setPlayers([])
        })
    }

    const onScoreChange = (id, score) => {
        setPlayers(players.map(p => 
            p.id === id 
            ? {...p, score}
            : p
        ))
    }

    const isValid = () => {
        return durationValid && players.length > 0
    }

    const durationValidation = validation(
        setDurationValid,
        (value) => value > 0,
        "Should be a positive number"
    )

    const topScore = players.length > 0 ? players[0].score : -1

    const onScoreFocusLoss = () => { // sort players by score
        setPlayers(players.slice().sort((a, b) => b.score - a.score))
    }

    return (
        <Surface className="flex flex-col space-y-3">
            <h1 className="text-slate-300 pb-2">New playsession</h1>
            <form onSubmit={onSubmit}>
                <div className="grid grid-cols-3 gap-2 items-center text-slate-400">

                    <span className="text-right">Date</span>
                    <div className="col-span-2">
                        <DateInput date={date} setDate={setDate}/>
                    </div>

                    <span className="text-right">Duration</span>
                    <div className="col-span-2">
                        <InputField 
                            value={duration} 
                            onChange={(event) => { setDuration(event.target.value) }} 
                            placeholder="duration (min)"
                            type="number"
                            validation={durationValidation}
                        />
                    </div>

                    <span className="pt-2 sm:pt-4 text-slate-400">Select players</span>
                    <div className="col-span-3 text-sm text-slate-400 font-light max-w-sm pb-2">
                        <PlayerSelector players={players} users={users} setPlayers={setPlayers}/>
                    </div>

                    {players.length > 0 && 
                    <div className="col-span-3 space-y-2">
                        <div className="flex flex-row items-center
                        uppercase text-slate-500 text-xs space-x-4">
                            <span className="w-5"></span>
                            <span className="flex-grow">Player</span>
                            <span className="pr-4">Score</span>
                        </div>
                        {players.map(player => 
                            <div key={player.id} className="flex flex-row space-x-4 items-center  
                            text-slate-400 py-1 px-2">
                                <span className="w-5">
                                    {player.score === topScore && 
                                        <StarIcon className="w-5 h-5 text-orange-500"/>
                                    }
                                </span>
                                <div className="flex-grow">{player.name}</div>
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
                        <PrimaryButton type="submit" content="add playsession" disabled={!isValid()}/>
                    </div>
                </div>
            </form>
        </Surface>
    )
}

export default PlaySessionForm