import { useMutation } from "react-query"
import boardgameService from "../services/boardgameService"
import queryClient from "../services/queryClient"

const useDeleteBoardgame = () => {
    return useMutation(boardgameService.deleteBoardgame, {
        onSuccess: (result, variables, context) => {
            queryClient.setQueryData("boardgames",
                boardgames => boardgames?.filter(boardgame => boardgame.id !== result.id)
            )
        }
    }).mutateAsync
}

export default useDeleteBoardgame