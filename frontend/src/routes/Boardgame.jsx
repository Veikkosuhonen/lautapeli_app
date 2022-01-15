import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import PlaySession from '../components/PlaySession';
import PlaySessionForm from '../components/PlaySessionForm';

import boardgameService from '../services/boardgameService';
import playSessionService from '../services/playSessionService';

import { toast } from 'react-toastify';
import api from '../services/api';
import HeroSection from '../components/HeroSection';
import PaginatedList from '../components/util/PaginatedList';
import { CheckIcon, PencilIcon, XIcon } from '@heroicons/react/outline';
import EditableParagraph from '../components/util/EditableParagraph';

const Boardgame = ({
    user,
    users,
    addActivity
}) => {

    const [boardgame, setBoardgame] = useState(null)
    const [editing, setEditing] = useState(false)
    const [newDescription, setNewDescription] = useState("")
    const navigate = useNavigate()
    const id = useParams().boardgameId

    useEffect(() => {
        if (!user) return
        console.log("Getting boardgame " + id)
        api.setToken(user.token)
        boardgameService.getOne(id).then(bg => {
            setBoardgame({
                ...bg,
                playSessions: bg.playSessions.sort((c1, c2) => new Date(c2.date) - new Date(c1.date))
            })
            setNewDescription(bg.description)
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

    const updateDescription = () => {
        const response = boardgameService.put(boardgame.id, { description: newDescription })

        toast.promise(response, {
            pending: "Updating description...",
            success: "Success",
            error: { render({data}) { return data.message }}
        })

        response.then(updated => {

            setBoardgame({ 
                ...boardgame,
                description: updated.description
            })
            
        }).catch(error => {
            console.log(error.message)
        })
    }

    const descriptionEdited = boardgame && newDescription !== boardgame.description
    const hasPlaySessions = boardgame && boardgame.playSessions.length !== 0

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
            <div className="p-2 sm:p-4 md:p-8">
                <div className="flex flex-row w-full items-start gap-4 self-align-end pb-8 md:pb-10 lg:pb-16 xl:pb-20">
                    <>
                        <EditableParagraph 
                            value={newDescription} 
                            setValue={setNewDescription}
                            disabled={!editing}
                            placeholder={"No description available"}
                            className={"flex-grow"}
                            id="description"
                        />
                        { !editing ? 
                        <button onClick={() => { setEditing(true) }}>
                            <PencilIcon className="text-slate-400 hover:text-slate-200 w-6 h-6"/>
                        </button> 
                        : <>
                            <button 
                                disabled={!descriptionEdited}
                                onClick={() => { setEditing(false); updateDescription() }}
                                className="text-slate-400 hover:text-slate-200  disabled:text-slate-600"
                            >
                                <CheckIcon className="w-7 h-7"/>
                            </button>
                            <button 
                                onClick={() => { setEditing(false); setNewDescription(boardgame.description) }}
                                className="text-slate-400 hover:text-slate-200"
                            >
                                <XIcon className="w-7 h-7"/>
                            </button>
                        </>
                        }
                    </>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <PaginatedList 
                        className="basis-1/4"
                        title={<h1 className="text-slate-400 text-md font-normal">Playsessions</h1>}
                    >
                        {hasPlaySessions && boardgame.playSessions.map(ps => 
                            <div className="py-2">
                                <PlaySession key={ps.id} playSession={ps}/>
                            </div>
                        )}
                    </PaginatedList>
                    <PlaySessionForm user={user} boardgame={boardgame} addPlaySession={addPlaySession} users={users}/>
                </div>
            </div>
            : <>
                <span className="text-slate-200 text-xl">Loading...</span>
            </>}
        </div>
    )
}

export default Boardgame