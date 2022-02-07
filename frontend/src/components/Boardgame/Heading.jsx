import LikeButton from "./LikeButton"
import OptionsDropDown from "../util/OptionsDropdown"
import DeleteButton from "./DeleteButton"
import { NavLink } from "react-router-dom"
import classNames from "classnames"

const tags = [
    "nopee", "korttipeli", "party", "inessä", "tooodella simppeli", "+"
]

const NavBarLink = ({ to, children }) => (
    <NavLink 
        to={to}
        className={({isActive}) => classNames(
            "px-4 border-b-2 pb-2 border-transparent hover:border-slate-400 whitespace-nowrap",
            {"border-slate-600": isActive}
        )}
    >
        {children}
    </NavLink>
)

const Heading = ({ 
    boardgame, user, handleLike, handleDelete
}) => {

    const isOwner = boardgame?.addedById === user?.id || user?.isAdmin

    const isLiked = boardgame?.likes.some(like => like.userId === user?.id)
    
    const canDelete = boardgame?.playSessions?.length === 0

    return (
            
        <div className="shadow-lg border-b border-slate-700 px-2 sm:px-2 md:px-8">
            <div className="flex flex-col gap-4">
                {/* Title row */}
                <div className="flex flex-row items-end gap-4">
                    <h1 className="text-slate-100 font-light text-4xl pr-8">
                        {boardgame?.name}
                    </h1>
                    <LikeButton liked={isLiked} onClick={handleLike} likes={boardgame?.likes.length}/>
                    <OptionsDropDown>
                        <DeleteButton 
                            onClick={handleDelete} 
                            disabled={!isOwner || !canDelete} 
                            disabledMessage={isOwner ? "Has playsessions, deletion not allowed" : "You aren't allowed to delete this boardgame"}
                        />
                    </OptionsDropDown>
                </div>
            </div>

            <div className="flex flex-wrap gap-x-1 gap-y-1 pt-6 pb-8">
                {tags.map((tag, i) => 
                    <div key={i} className="px-1 cursor-pointer
                        rounded-full border-2 border-green-800 
                        text-slate-300 text-sm font-light whitespace-nowrap
                        hover:bg-green-800
                    ">
                        {tag}
                    </div>
                )}
            </div>

            <div>
                <p className="text-slate-400">
                    {boardgame?.description}
                </p>
            </div>

            <nav className="flex pt-8 text-lg text-slate-300">
                <NavBarLink to="playsessions">
                    Game history
                </NavBarLink>
                <NavBarLink to="gallery">
                    Gallery
                </NavBarLink>
                <NavBarLink to="discussion">
                    Discussion
                </NavBarLink>
                <NavBarLink to="edit">
                    Edit
                </NavBarLink>
            </nav>
        </div>
    )
}

export default Heading