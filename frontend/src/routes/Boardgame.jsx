import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import PlaySession from '../components/PlaySession';
import PlaySessionForm from '../components/PlaySessionForm';

import bgService from '../services/boardgameService';
import playSessionService from '../services/playSessionService';

import { toast } from 'react-toastify';
import api from '../services/api';
import HeroSection from '../components/HeroSection';
import PaginatedList from '../components/util/PaginatedList';

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
            setBoardgame({
                ...bg,
                playSessions: bg.playSessions.sort((c1, c2) => new Date(c2.date) - new Date(c1.date))
            })
        }).catch(error => {
            if (error.status === 404) {
                navigate("/oopsie")
            } else {
                toast(error.message)
            }
        })
    }, [user, id, navigate])


    const addPlaySession = (playSession, clear) => {
        const response = playSessionService.post(playSession)

        toast.promise(response, {
            pending: "Adding playsession",
            success: "Success",
            error: { render({data}) { return data.message }}
        })

        response.then(data => {

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
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 p-2 sm:p-4 md:p-8">
                <PaginatedList 
                    className="basis-1/4"
                    title={<h1 className="text-slate-400 text-md font-normal">Playsessions</h1>}
                >
                    {boardgame && boardgame.playSessions.length !== 0 && boardgame.playSessions.map(ps => 
                        <div className="py-2">
                            <PlaySession key={ps.id} playSession={ps}/>
                        </div>
                    )}
                </PaginatedList>
                <PlaySessionForm user={user} boardgame={boardgame} addPlaySession={addPlaySession} users={users}/>
            </div>
            : <>
                <span className="text-slate-200 text-xl">Loading...</span>
            </>}
        </div>
    )
}

export default Boardgame