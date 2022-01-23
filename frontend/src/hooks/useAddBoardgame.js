import { useMutation } from "react-query"
import boardgameService from "../services/boardgameService"
import queryClient from "../services/queryClient"

const useAddBoardgame = () => {
    return useMutation(boardgameService.post, {
        onSuccess: (result, variables, context) => {
            queryClient.setQueryData("boardgames",
                boardgames => boardgames.concat(result.boardgame)
            )
            queryClient.setQueryData("activities",
                activities => [result.activity].concat(activities)
            )
        }
    }).mutateAsync
}

export default useAddBoardgame