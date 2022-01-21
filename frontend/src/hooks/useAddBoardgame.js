import { useMutation } from "react-query"
import bgService from "../services/boardgameService"
import queryClient from "../services/queryClient"

const useAddBoardgame = () => {
    return useMutation(bgService.post, {
        onSuccess: (result, variables, context) => {
            queryClient.setQueryData("boardgames",
                boardgames => boardgames.concat(result.boardgame)
            )
            queryClient.setQueryData("activities",
                activities => [result.activity].concat(activities)
            )
        }
    })
}

export default useAddBoardgame