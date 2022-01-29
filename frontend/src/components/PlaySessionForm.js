import React from 'react'
import { useState } from 'react'
import { PrimaryButton } from './util/Buttons';
import InputField from './util/InputField';
import DateInput from './util/DateInput';
import Surface from "./util/Surface"
import PlayerSelector from "./PlayerSelector"
import { StarIcon } from '@heroicons/react/solid';
import { validation } from "../util/validation"
import useAddPlaySession from '../hooks/useAddPlaySession';
import toaster from '../util/toaster';
import { XIcon } from '@heroicons/react/outline';

const ScoreInput = (
    {value, onChange, ...props}
) => {

    return (
        <div className="">
            <input 
                value={value}
                onChange={onChange}
                type="number"
                placeholder="score"
                className="rounded bg-slate-700 p-1 my-2 focus:outline-none text-center w-20 font-serif text-orange-500"
                onBlur={props["onBlur"]}
            />
        </div>
    )
}

const PlaySessionForm = ({
    user, users, boardgame
}) => {

    const addPlaySession = useAddPlaySession()

    const [duration, setDuration] = useState(0)
    const [date, setDate] = useState(new Date())
    const [players, setPlayers] = useState(user ? [{ id: user.id, name: user.name, score: 0 }] : [])
    const [durationValid, setDurationValid] = useState(false)

    const onSubmit = (event) => {
        event.preventDefault()
        const playSessionObject = {
            boardgameId: boardgame.id,
            duration,
            date,
            players: players.map(p => ({ id: p.id, score: p.score }))
        }
        const response = addPlaySession(playSessionObject)
        toaster.playSessionAddMessage(response)
    }

    const onScoreChange = (id, score) => {
        setPlayers(players.map(p => 
            p.id === id 
            ? {...p, score}
            : p
        ))
    }

    const isValid = () => {
        return durationValid && players.some(player => player.id === user.id)
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

    const handleSelect = (option) => {
        setPlayers(players.concat({...option, score: 0}))
    }

    const handleRemove = (player) => {
        setPlayers(players.filter(p => p !== player))
    }

    return (
        <div className="flex flex-row justify-center py-2 px-6 w-full">
        <Surface className="sm:w-full sm:basis-2/3 md:basis-1/2 lg:basis-2/5 xl:basis-1/3">
            <h1 className="text-slate-300 pb-6">New playsession</h1>
            <form onSubmit={onSubmit}>
                <div className="grid grid-cols-3 items-center text-slate-400">

                    <span>Date</span>
                    <div className="col-span-3 pb-4">
                        <DateInput date={date} setDate={setDate}/>
                    </div>

                    <span>Duration</span>
                    <div className="col-span-3 pb-6">
                        <InputField 
                            value={duration} 
                            onChange={(event) => { setDuration(event.target.value) }} 
                            placeholder="duration (min)"
                            type="number"
                            validation={durationValidation}
                        />
                    </div>

                    <span className="text-slate-400">Select players</span>
                    <div className="col-span-3 pb-4">
                        <PlayerSelector players={players} users={users} handleSelect={handleSelect}/>
                    </div>

                    <div className="col-span-3 space-y-2">
                        <div className="flex flex-row items-center
                        uppercase text-slate-500 text-xs space-x-4">
                            <span className="w-5"></span>
                            <span className="flex-grow">Player</span>
                            <span className="pr-4">Score</span>
                            <div className="w-5 h-5"/>
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
                                
                                { player.id !== user.id  // dont show remove button when its the user themselves
                                ? <button 
                                    type="button"
                                    onClick={() => handleRemove(player)}
                                    className="text-slate-400 hover:text-slate-100"
                                >
                                    <XIcon className="w-5 h-5"/>
                                </button>
                                : <div className="w-5 h-5"/>
                                }
                                
                            </div>
                        )}  
                    </div>

                    <div className="col-span-3 pt-4">
                        <PrimaryButton type="submit" content="add playsession" disabled={!isValid()}/>
                    </div>
                </div>
            </form>
        </Surface>
        </div>
    )
}

export default PlaySessionForm