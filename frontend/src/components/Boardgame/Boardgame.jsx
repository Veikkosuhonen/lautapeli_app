import React, { useRef } from 'react'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import PlaySessionForm from './PlaySessionForm';
import toaster from '../../util/toaster';
import useCurrentUser from '../../hooks/useCurrentUser';
import useUsers from '../../hooks/useUsers';
import useBoardgame from '../../hooks/useBoardgame';
import useDeleteBoardgame from '../../hooks/useDeleteBoardgame';
import useUpdateLike from '../../hooks/useUpdateLike';
import PopupWindow from '../util/PopupWindow';
import Album from "./Album"
import Heading from './Heading';
import HeroSection from '../HeroSection';
import Discussion from './Discussion';
import Edit from './Edit';
import BoardgamePlaySessions from './BoardgamePlaySessions';

const Boardgame = () => {

    const { user } = useCurrentUser()
    const { users } = useUsers()
    const id = useParams().boardgameId
    const { boardgame } = useBoardgame(id)

    const deleteBoardgame = useDeleteBoardgame()
    const updateLike = useUpdateLike()

    const navigate = useNavigate()

    const isLiked = boardgame?.likes.some(like => like.userId === user?.id)
    
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

    const playSessionFormPopupRef = useRef()

    return (
        <>
            <PopupWindow ref={playSessionFormPopupRef}>
                <PlaySessionForm user={user} boardgame={boardgame} users={users}/>
            </PopupWindow>

            <HeroSection />

            <Heading 
                boardgame={boardgame}
                user={user}
                handleLike={handleLike}
                handleDelete={handleDelete}
            />

            { boardgame &&
            <div className="flex justify-center">
                <div className="w-full px-2 md:w-5/6 lg:4/5 py-4">
                    <Routes>
                        <Route path="discussion" element={<Discussion boardgame={boardgame} />}/>
                        <Route path="playsessions" element={<BoardgamePlaySessions boardgame={boardgame} />}/>
                        <Route path="gallery" element={<Album boardgame={boardgame} />}/>
                        <Route path="edit" element={<Edit boardgame={boardgame} user={user}/>} />
                    </Routes>
                </div>
            </div>
            }
        </>
    )
}

export default Boardgame