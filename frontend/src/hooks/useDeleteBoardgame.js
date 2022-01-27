import { useMutation } from "react-query"
import api from "../services/api"
import queryClient from "../services/queryClient"

const useDeleteBoardgame = () => {

    const mutationFn = async (boardgame) => api.del("/boardgames/" + boardgame.id)

    const updateFn = (result) => (boardgames) => boardgames?.filter(boardgame => boardgame.id !== result.id)

    return useMutation(mutationFn, {
        onSuccess: (result, variables, context) => {
            queryClient.setQueryData("boardgames", updateFn(result))
        }
    }).mutateAsync
}

export default useDeleteBoardgame