import Surface from "../components/util/Surface"
import useAddBoardgame from "../hooks/useAddBoardgame"
import toaster from "../util/toaster"
import NewBoardgameForm from "../components/NewBoardgameForm"

const NewBoardgame = () => {

    const addBoardgame = useAddBoardgame()

    const submitHandler = (boardgame) => {
        const response = addBoardgame(boardgame)
        toaster.boardgameAddMessage(response);
    }

    return (
        <div className="flex flex-row justify-center py-2 px-6 w-full">
        <Surface className="sm:w-full sm:basis-2/3 md:basis-1/2 lg:basis-2/5 xl:basis-1/3">
            <div className="flex flex-col space-y-4 justify-center">
                <div className="flex flex-row">
                    <h2 className="text-slate-200 text-base text-center mr-auto items-center">New boardgame</h2>
                </div>
                <NewBoardgameForm handleSubmit={submitHandler} />
            </div>
        </Surface>
        </div>
    )
};

export default NewBoardgame