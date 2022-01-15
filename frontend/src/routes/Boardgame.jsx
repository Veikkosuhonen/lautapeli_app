import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import PlaySession from '../components/PlaySession';
import PlaySessionForm from '../components/PlaySessionForm';

import bgService from '../services/boardgameService';
import playSessionService from '../services/playSessionService';

import { toast } from 'react-toastify';
import api from '../services/api';
import Surface from '../components/util/Surface';
import HeroSection from '../components/HeroSection';

const Boardgame = ({
    user,
    users,
    addActivity
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


    const addPlaySession = (playSession, clear) => {
        console.log("Adding " + JSON.stringify(playSession))
        const response = playSessionService.post(playSession)

        toast.promise(response, {
            pending: "Adding playsession",
            success: "Success",
            error: { render({data}) { return data.message }}
        })

        response.then(data => {
            console.log(JSON.stringify(data))

            const playSession = data.playSession

            addActivity(data.activity)

            setBoardgame({
                ...boardgame, 
                playSessions: boardgame.playSessions.concat(playSession)
            })
            
            clear()
        }).catch(error => {
            console.log(error.message)
        })
    }

    return (
        <div className="basis-full">
            <HeroSection>
                {boardgame && 
                <div className="flex flex-col justify-end space-y-4">
                    <h1>{boardgame.name}</h1>
                    <span className="text-lg text-slate-400">Added {boardgame.dateAdded}</span>
                </div>
                }
            </HeroSection>
            {boardgame ? 
            <div className="flex flex-col space-y-2 sm:space-y-4">
                <Surface>
                    <h1 className="text-slate-400 text-md font-normal pb-6">Playsessions</h1>
                    <ul className="flex flex-col space-y-6">
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