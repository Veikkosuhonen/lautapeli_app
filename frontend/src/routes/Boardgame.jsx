import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import PlaySession from '../components/PlaySession';
import PlaySessionForm from '../components/PlaySessionForm';

import toaster from '../util/toaster';
import HeroSection from '../components/HeroSection';
import PaginatedList from '../components/util/PaginatedList';
import { ArrowNarrowLeftIcon, CheckIcon, DotsHorizontalIcon, PencilIcon, XIcon } from '@heroicons/react/outline';
import EditableParagraph from '../components/util/EditableParagraph';
import useCurrentUser from '../hooks/useCurrentUser';
import useUsers from '../hooks/useUsers';
import useBoardgame from '../hooks/useBoardgame';
import useUpdateDescription from '../hooks/useUpdateDescription';
import OptionsDropDown from '../components/util/OptionsDropdown';
import useDeleteBoardgame from '../hooks/useDeleteBoardgame';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import useUpdateLike from '../hooks/useUpdateLike';

const Boardgame = () => {
    const [editing, setEditing] = useState(false)
    const [newDescription, setNewDescription] = useState("")

    const { user } = useCurrentUser()
    const { users } = useUsers()
    const id = useParams().boardgameId
    const { boardgame } = useBoardgame(id, { onSuccess: (data) => setNewDescription(data.description) })

    const updateDescription = useUpdateDescription()
    const deleteBoardgame = useDeleteBoardgame()
    const updateLike = useUpdateLike()

    const navigate = useNavigate()

    const handleDescriptionUpdate = () => {
        const response = updateDescription({
            ...boardgame,
            description: newDescription
        })

        toaster.descriptionUpdateMessage(response)
    }

    const descriptionEdited = boardgame && newDescription !== boardgame.description

    const playSessions = boardgame ? [...boardgame.playSessions].sort((a, b) => new Date(b.date) - new Date(a.date)) : []

    const isOwner = boardgame?.addedById === user?.id

    const isLiked = boardgame?.likes.some(like => like.userId === user?.id)
    
    const canDelete = playSessions?.length === 0

    const handleDelete = () => {
        if (!isOwner) return
        if (!canDelete) {
            toaster.errorMessage("Cannot delete a boardgame that has playsessions")
            return
        }
        if (window.confirm("Are you absolutely sure you want to delete " + boardgame?.name + "?")) {
            const response = deleteBoardgame(boardgame)
            toaster.deleteBoardgameMessage(response)
            response.then(() => {
                navigate("/boardgames")
            })
        }
    }

    const handleLike = () => {
        updateLike({ like: !isLiked, boardgameId: boardgame.id })
    }

    return (
        <div className="basis-full">

            <HeroSection />

            {boardgame ?
            <div className="p-2 sm:p-4 md:p-8">
                <Link to="/boardgames">
                    <ArrowNarrowLeftIcon className="w-7 h-7 text-slate-500 hover:text-slate-200"/>
                </Link>
                <div className="flex flex-col gap-4 pb-12 md:pb-16 lg:pb-20 pt-2">
                    <div className="flex flex-row items-center gap-2">
                        <h1 className="text-slate-100 font-light text-4xl pr-8">
                            {boardgame.name}
                        </h1>
                        <LikeButton liked={isLiked} onClick={handleLike} likes={boardgame.likes?.length}/>
                        <OptionsDropDown button={
                            <div className="p-1 rounded-lg bg-slate-800/50">
                                <DotsHorizontalIcon className="text-slate-500 hover:text-slate-200 w-5 h-5 md:w-7 md:h-7" />
                            </div>
                        }>
                            <DeleteButton onClick={handleDelete} disabled={!isOwner || !canDelete} />
                        </OptionsDropDown>
                    </div>
                    <div className="flex flex-row w-full items-start gap-4 basis-1/3">
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
                    </div>
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