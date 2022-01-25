import { useMutation } from "react-query"
import api from "../services/api"
import queryClient from "../services/queryClient"

const useDeleteBoardgame = () => {

    const mutationFn = async (id) => api.del("/boardgames/" + id)

    return useMutation(mutationFn, {
        onSuccess: (result, variables, context) => {
            queryClient.setQueryData("boardgames",
                boardgames => boardgames?.filter(boardgame => boardgame.id !== result.id)
            )
        }
    }).mutateAsync
}

export default useDeleteBoardgame