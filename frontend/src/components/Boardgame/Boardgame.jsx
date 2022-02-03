import React, { useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import PlaySession from './PlaySession';
import PlaySessionForm from './PlaySessionForm';
import toaster from '../../util/toaster';
import HeroSection from '../HeroSection';
import PaginatedList from '../util/PaginatedList';
import { ArrowNarrowLeftIcon } from '@heroicons/react/outline';
import useCurrentUser from '../../hooks/useCurrentUser';
import useUsers from '../../hooks/useUsers';
import useBoardgame from '../../hooks/useBoardgame';
import useUpdateDescription from '../../hooks/useUpdateDescription';
import OptionsDropDown from '../util/OptionsDropdown';
import useDeleteBoardgame from '../../hooks/useDeleteBoardgame';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import useUpdateLike from '../../hooks/useUpdateLike';
import useDeletePlaySession from '../../hooks/useDeletePlaySession';
import EditableDescription from './EditableDescription';
import CommentSection from './CommentSection';
import PopupWindow from '../util/PopupWindow';
import { SecondaryButton } from '../util/Buttons';

const Boardgame = () => {
    const [newDescription, setNewDescription] = useState("")

    const { user } = useCurrentUser()
    const { users } = useUsers()
    const id = useParams().boardgameId
    const { boardgame } = useBoardgame(id, { onSuccess: (data) => setNewDescription(data.description) })

    const updateDescription = useUpdateDescription()
    const deleteBoardgame = useDeleteBoardgame()
    const updateLike = useUpdateLike()
    const deletePlaySession = useDeletePlaySession()

    const navigate = useNavigate()

    const handleDescriptionUpdate = () => {
        const response = updateDescription({
            ...boardgame,
            description: newDescription
        })

        toaster.descriptionUpdateMessage(response)
    }

    const playSessions = boardgame ? [...boardgame.playSessions].sort((a, b) => new Date(b.date) - new Date(a.date)) : []

    const isOwner = boardgame?.addedById === user?.id || user?.isAdmin

    const isLiked = boardgame?.likes.some(like => like.userId === user?.id)
    
    const canDelete = playSessions?.length === 0

    const handleDelete = () => {
        if (!window.confirm("Are you absolutely sure you want to delete " + boardgame?.name + "?")) return
        const response = deleteBoardgame(boardgame)
        toaster.deleteBoardgameMessage(response)
        response.then(() => {
            navigate("/boardgames")
        })
    }

    const handleLike = () => {
        updateLike({ like: !isLiked, boardgameId: boardgame.id })
    }

    const handleDeletePlaySession = (playSession) => {
        if (!window.confirm("Confirm that you want to delete this playsession.")) return
        const response = deletePlaySession(playSession)
        toaster.deletePlaySessionMessage(response)
    }

    const playSessionFormPopupRef = useRef()

    return (
        <>
            <PopupWindow ref={playSessionFormPopupRef}>
                <PlaySessionForm user={user} boardgame={boardgame} users={users}/>
            </PopupWindow>
            
            <HeroSection />

            {boardgame ?
            <div className="p-2 sm:p-4 md:p-8">
                {/* Back-arrow */}
                <div className="w-min">
                    <Link to="/boardgames">
                        <ArrowNarrowLeftIcon className="w-7 h-7 text-slate-500 hover:text-slate-200"/>
                    </Link>
                </div>
                <div className="flex flex-col gap-4 pb-12 md:pb-16 lg:pb-20 pt-2">
                    {/* Title row */}
                    <div className="flex flex-row items-center gap-4">
                        <h1 className="text-slate-100 font-light text-4xl pr-8">
                            {boardgame.name}
                        </h1>
                        <LikeButton liked={isLiked} onClick={handleLike} likes={boardgame.likes?.length}/>
                        <OptionsDropDown>
                            <DeleteButton 
                                onClick={handleDelete} 
                                disabled={!isOwner || !canDelete} 
                                disabledMessage={isOwner ? "Has playsessions, deletion not allowed" : "You aren't allowed to delete this boardgame"}
                            />
                        </OptionsDropDown>
                    </div>
                    
                </div>
                <div className="flex flex-col gap-y-10">
                    
                    <div className="flex flex-col gap-4 sm:flex-row w-full">
                        <div className="flex-grow">
                            <EditableDescription 
                                newDescription={newDescription}
                                setNewDescription={setNewDescription}
                                oldDescription={boardgame.description}
                                handleUpdate={handleDescriptionUpdate}
                            />
                        </div>
                        <PaginatedList 
                            className=""
                            title={<h1 className="text-slate-400 text-md font-normal">Playsessions</h1>}
                        >
                            {playSessions.map(ps => 
                                <div className="py-2" key={ps.id}>
                                    <PlaySession playSession={ps} handleDelete={handleDeletePlaySession} user={user}/>
                                </div>
                            )}
                        </PaginatedList>
                    </div>
                    <SecondaryButton content={"add playsession"} onClick={() => { playSessionFormPopupRef.current.setOpen(true) }}/>

                    <CommentSection boardgame={boardgame} />
                </div>
            </div>
            : <>
                <span className="text-slate-200 text-xl">Loading...</span>
            </>}
            
        </>
    )
}

export default Boardgame