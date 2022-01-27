import Surface from "../components/util/Surface"
import { NavLink } from "react-router-dom"
import { XIcon } from "@heroicons/react/solid"
import useAddBoardgame from "../hooks/useAddBoardgame"
import toaster from "../util/toaster"
import NewBoardgameForm from "../components/NewBoardgameForm"

export default function NewBoardgame() {

    const addBoardgame = useAddBoardgame()

    const submitHandler = (boardgame) => {
        const response = addBoardgame(boardgame)
        toaster.boardgameAddMessage(response);
    }

    return (
        <Surface className="py-6 px-6 mb-4">
            <div className="flex flex-col space-y-4 justify-center">
                <div className="flex flex-row">
                    <h2 className="text-slate-200 text-base text-center mr-auto items-center">New boardgame</h2>
                    <NavLink to="/boardgames">
                        <XIcon className="text-slate-400 w-6 h-6 hover:text-slate-200"/>
                    </NavLink>
                </div>
                <NewBoardgameForm handleSubmit={submitHandler} />
            </div>
        </Surface>
    )
};
