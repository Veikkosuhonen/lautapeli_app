import LikeButton from "./LikeButton"
import { NavLink } from "react-router-dom"
import classNames from "classnames"

const tags = [
    "nopee", "korttipeli", "party", "inessä", "tooodella simppeli", "nämä ovat vielä placeholdereita", "+"
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
    boardgame, user, handleLike
}) => {

    const isLiked = boardgame?.likes.some(like => like.userId === user?.id)
    
    return (
            
        <div className="shadow-lg border-b border-slate-700 sm:px-2 md:px-8">

            <div className="px-2">
                {/* Title row */}
                <div className="flex flex-row items-end gap-4">
                    <h1 className="text-slate-100 font-light text-4xl pr-8">
                        {boardgame?.name}
                    </h1>
                    <LikeButton liked={isLiked} onClick={handleLike} likes={boardgame?.likes.length}/>
                </div>

                <div className="flex gap-2 pt-2">
                    <span className="text-slate-500">Added by {boardgame?.addedBy.name}</span>
                    <span className="italic text-slate-500">{new Date(boardgame?.dateAdded).toDateString()}</span>
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
            </div>

            <nav className="flex pt-10 text-lg text-slate-300 overflow-x-scroll sm:overflow-hidden">
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