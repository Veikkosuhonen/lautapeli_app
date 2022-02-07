import React, { useRef } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import PlaySessionForm from './PlaySessionForm';
import useCurrentUser from '../../hooks/useCurrentUser';
import useUsers from '../../hooks/useUsers';
import useBoardgame from '../../hooks/useBoardgame';
import useUpdateLike from '../../hooks/useUpdateLike';
import PopupWindow from '../util/PopupWindow';
import Album from "./Album"
import Heading from './Heading';
import HeroSection from '../util/HeroSection';
import Discussion from './Discussion';
import Edit from './Edit';
import BoardgamePlaySessions from './BoardgamePlaySessions';

const Boardgame = () => {

    const { user } = useCurrentUser()
    const { users } = useUsers()
    const id = useParams().boardgameId
    const { boardgame } = useBoardgame(id)

    const updateLike = useUpdateLike()

    const isLiked = boardgame?.likes.some(like => like.userId === user?.id)

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
            />

            { boardgame &&
            <div className="flex justify-center">
                <div className="w-full px-2 md:w-5/6 lg:4/5 py-4">
                    <Routes>
                        <Route path="discussion" element={<Discussion boardgame={boardgame} />}/>
                        <Route path="playsessions" element={<BoardgamePlaySessions boardgame={boardgame} />}/>
                        <Route path="gallery" element={<Album boardgame={boardgame} />}/>
                        <Route path="edit" element={<Edit boardgame={boardgame} user={user}/>} />
                        <Route index element={<Navigate to="playsessions" />} />
                    </Routes>
                </div>
            </div>
            }
        </>
    )
}

export default Boardgame