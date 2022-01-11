import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import PlaySession from '../components/PlaySession';
import PlaySessionForm from '../components/PlaySessionForm';

import bgService from '../services/boardgameService';
import playSessionService from '../services/playSessionService';

import { toast } from 'react-toastify';
import api from '../services/api';
import { PlayIcon } from '@heroicons/react/outline';
import Surface from '../components/Surface';

const Boardgame = ({
    user,
    users
}) => {

    const [boardgame, setBoardgame] = useState(null)
    const navigate = useNavigate()
    const id = useParams().boardgameId

    useEffect(() => {
        if (!user) return
        console.log("Getting boardgame " + id)
        api.setToken(user.token)
        bgService.getOne(id).then(bg => {
            setBoardgame(bg)
            console.log(JSON.stringify(bg))
        }).catch(error => {
            console.log(JSON.stringify(error.status))
            if (error.status === 404) {
                navigate("/oopsie")
            } else {
                toast(error.message)
            }
        })
    }, [user, id, navigate])


    const addPlaySession = (playSession) => {
        console.log("Adding " + JSON.stringify(playSession))
        const response = playSessionService.post(playSession)

        toast.promise(response, {
            pending: "Adding playsession",
            success: "Success",
            error: { render({data}) { return data.message }}
        })

        response.then(playSession => {
            setBoardgame({
                ...boardgame, 
                playSessions: boardgame.playSessions.concat(playSession)
            })
        }).catch(error => {
            console.log(error.message)
        })
    }

    return (
        <div className="flex flex-row justify-center">
            {boardgame ? 
            <div className="flex flex-col space-y-4">
                <Surface>
                    <div className="flex flex-row items-center space-x-2">
                        <PlayIcon className="w-10 h-10 text-slate-400"/>
                        <h1 className="text-slate-400 text-2xl">{boardgame.name}</h1>
                    </div>
                </Surface>
                <Surface>
                    <ul className="text-slate-400 font-light">
                        {boardgame && boardgame.playSessions.length !== 0 && boardgame.playSessions.map(ps => 
                            <PlaySession key={ps.id} playSession={ps}/>
                        )}
                    </ul>
                    {boardgame && boardgame.playSessions.length === 0 &&
                        <p className="text-sm text-slate-500">Not yet played</p>
                    }
                </Surface>
                <PlaySessionForm user={user} boardgame={boardgame} addPlaySession={addPlaySession} users={users}/>
            </div>
            : <>
                <span className="text-slate-200 text-xl">Loading...</span>
            </>}
        </div>
    )
}

export default Boardgame