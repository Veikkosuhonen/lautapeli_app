import { useMutation } from "react-query"
import api from "../services/api"
import queryClient from "../services/queryClient"

const useAddBoardgame = () => {

    const mutationFn = async (boardgame) => api.post("/boardgames", boardgame)

    return useMutation(mutationFn, {
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