import React from "react"
import Surface from "./util/Surface"
import { Link } from "react-router-dom"
import { CubeIcon, PlayIcon } from "@heroicons/react/outline"
import styles from "../util/styles"

const Boardgame = ({ boardgame }) => (
    <Surface className="
        border-l-4 border-slate-800
        transition duration-200
        hover:border-indigo-500"
    >
        <div className="flex flex-col justify-start px-2 gap-x-4 space-y-2">
            <div className="flex items-start">
                <div className="mr-auto">
                    <Link to={"/boardgames/" + boardgame.id} className={styles.boardgameTitle}>
                        <h1 className="truncate w-48">
                            {boardgame.name}
                        </h1>
                    </Link>
                </div>
                <div className="flex items-center select-none" title={"likes"}>
                    <CubeIcon className="text-rose-500 w-5 h-5"/>
                    <span className="text-slate-300 tabular-nums">{boardgame?.numLikes}</span>
                </div>
            </div>
            <div className="flex items-center">
                <p className="text-slate-500 text-xs mr-auto pr-1">Added {new Date(boardgame.dateAdded).toLocaleDateString("fi")} by {boardgame.addedBy?.name}</p>
                <div className="flex items-center select-none" title={"times played"}>
                    <PlayIcon className="text-orange-500 w-5 h-5"/>
                    <span className="text-slate-300 tabular-nums">{boardgame.playSessions ? boardgame.playSessions.length : 0}</span>
                </div>
            </div>
        </div>
    </Surface>
)

const BoardgamesList = ({ 
    boardgames, onSelect,
 }) => (
    <div className="
        grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-4 gap-x-2"
    >
        {boardgames?.map(bg => 
            <Boardgame key={bg.id} boardgame={bg} onSelect={onSelect}/>
        )}
    </div>
)

export default BoardgamesList