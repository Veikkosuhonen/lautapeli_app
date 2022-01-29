import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik } from "formik"
import * as Yup from "yup"
import FormikTextArea from '../components/util/FormikTextArea'
import { PrimaryButton } from '../components/util/Buttons'
import PlaySession from '../components/PlaySession';
import PlaySessionForm from '../components/PlaySessionForm';
import toaster from '../util/toaster';
import HeroSection from '../components/HeroSection';
import PaginatedList from '../components/util/PaginatedList';
import { ArrowNarrowLeftIcon, CheckIcon, PencilIcon, XIcon } from '@heroicons/react/outline';
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
import useAddComment from '../hooks/useAddComment';
import useDeletePlaySession from '../hooks/useDeletePlaySession';

const EditableDescription = ({
    newDescription, setNewDescription, oldDescription, handleUpdate
}) => {

    const [editing, setEditing] = useState(false)

    const descriptionEdited = oldDescription !== undefined && newDescription !== oldDescription

    return (
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
                    onClick={() => { setEditing(false); handleUpdate() }}
                    className="text-slate-400 hover:text-slate-200  disabled:text-slate-600 p-2"
                >
                    <CheckIcon className="w-7 h-7"/>
                </button>
                <button 
                    onClick={() => { setEditing(false); setNewDescription(oldDescription) }}
                    className="text-slate-400 hover:text-slate-200 p-2"
                >
                    <XIcon className="w-7 h-7"/>
                </button>
            </>
            }
        </div>
    )
}

const Comment = ({
    comment
}) => (
    <div className="flex flex-col gap-2 p-2">
        <div className="flex flex-row gap-2 items-end">
            <span className="text-sm font-serif text-slate-400">
                {comment.user.name}
            </span>
            <span className="text-xs text-slate-500">
                {new Date(comment.date).toLocaleString()}
            </span>
        </div>
        <p className="text-slate-400">
            {comment.comment}
        </p>
    </div>
)

const CommentSection = ({
    boardgame
}) => {

    const addComment = useAddComment()

    const handleSubmit = ({ comment }) => {
        const response = addComment({ boardgameId: boardgame.id, comment: comment })
        toaster.boardgameAddMessage(response)
    }

    return (
        <div className="flex flex-col">
            <PaginatedList
                className="basis-full sm:basis-1/2"
                title={<h1 className="text-slate-400 text-md font-normal">Comments</h1>}
            >
                {boardgame.comments.map(comment => 
                    <Comment comment={comment} key={comment.id} /> 
                )}
            </PaginatedList>
            <Formik
                initialValues={{comment: ""}}
                initialErrors={{comment: "cannot be blank"}}
                validationSchema={Yup.object({
                    comment: Yup.string().min(0).required("cannot be blank")
                })}
                onSubmit={handleSubmit}
            >
                {formik => (
                    <form onSubmit={formik.handleSubmit} className="flex flex-row items-end gap-2 p-2">
                        <FormikTextArea
                            label="Comment"
                            name="comment"
                            placeholder="New comment"
                        />
                        <div>
                            <PrimaryButton content={"Comment"} type={"submit"} disabled={!formik.isValid}/>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

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

    return (
        <>

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
                    <EditableDescription 
                        newDescription={newDescription}
                        setNewDescription={setNewDescription}
                        oldDescription={boardgame.description}
                        handleUpdate={handleDescriptionUpdate}
                    />
                </div>
                <div className="flex flex-col gap-y-10">
                    {/* Activity section */}
                    <div className="flex flex-col sm:flex-row gap-2">
                    {/* Playsessions */}
                        <PaginatedList 
                            className="basis-full sm:basis-1/2"
                            title={<h1 className="text-slate-400 text-md font-normal">Playsessions</h1>}
                        >
                            {playSessions.map(ps => 
                                <div className="py-2" key={ps.id}>
                                    <PlaySession playSession={ps} handleDelete={handleDeletePlaySession} user={user}/>
                                </div>
                            )}
                        </PaginatedList>
                    {/* Comments */}
                        <CommentSection boardgame={boardgame} />
                    </div>
                    <PlaySessionForm user={user} boardgame={boardgame} users={users}/>
                </div>
            </div>
            : <>
                <span className="text-slate-200 text-xl">Loading...</span>
            </>}
        </>
    )
}

export default Boardgame