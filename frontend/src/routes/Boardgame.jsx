import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import PlaySession from '../components/PlaySession';
import PlaySessionForm from '../components/PlaySessionForm';

import toaster from '../util/toaster';
import HeroSection from '../components/HeroSection';
import PaginatedList from '../components/util/PaginatedList';
import { CheckIcon, PencilIcon, XIcon } from '@heroicons/react/outline';
import EditableParagraph from '../components/util/EditableParagraph';
import useCurrentUser from '../hooks/useCurrentUser';
import useUsers from '../hooks/useUsers';
import useBoardgame from '../hooks/useBoardgame';
import useUpdateDescription from '../hooks/useUpdateDescription';

const Boardgame = () => {

    const user = useCurrentUser()
    const { users } = useUsers()
    const id = useParams().boardgameId
    const { boardgame } = useBoardgame(id)

    const [editing, setEditing] = useState(false)
    const [newDescription, setNewDescription] = useState("")

    const updateDescription = useUpdateDescription()

    const handleDescriptionUpdate = () => {
        const response = updateDescription({
            ...boardgame,
            description: newDescription
        })

        toaster.descriptionUpdateMessage(response)
    }

    const descriptionEdited = boardgame && newDescription !== boardgame.description

    const playSessions = boardgame ? [...boardgame.playSessions].sort((a, b) => new Date(b.date) - new Date(a.date)) : []

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
                <div className="flex flex-row w-full items-start gap-4 self-align-end pb-12 md:pb-16 lg:pb-20">
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
                        <button onClick={() => { setEditing(true) }} className="text-slate-400 hover:text-slate-200  p-2">
                            <PencilIcon className="w-6 h-6"/>
                        </button> 
                        : <>
                            <button 
                                disabled={!descriptionEdited}
                                onClick={() => { setEditing(false); handleDescriptionUpdate() }}
                                className="text-slate-400 hover:text-slate-200  disabled:text-slate-600 p-2"
                            >
                                <CheckIcon className="w-7 h-7"/>
                            </button>
                            <button 
                                onClick={() => { setEditing(false); setNewDescription(boardgame.description) }}
                                className="text-slate-400 hover:text-slate-200 p-2"
                            >
                                <XIcon className="w-7 h-7"/>
                            </button>
                        </>
                        }
                    </>
                </div>
                <div className="flex flex-col md:flex-row gap-y-10 gap-x-6">
                    <PaginatedList 
                        className="basis-1/4 sm:basis-2/5"
                        title={<h1 className="text-slate-400 text-md font-normal">Playsessions</h1>}
                    >
                        {playSessions.map(ps => 
                            <div className="py-2" key={ps.id}>
                                <PlaySession playSession={ps}/>
                            </div>
                        )}
                    </PaginatedList>
                    <div className="w-full">
                        <PlaySessionForm user={user} boardgame={boardgame} users={users}/>
                    </div>
                </div>
            </div>
            : <>
                <span className="text-slate-200 text-xl">Loading...</span>
            </>}
        </div>
    )
}

export default Boardgame