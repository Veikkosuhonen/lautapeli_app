import { useMutation } from "react-query"
import api from "../services/api"
import queryClient from "../services/queryClient"

const useAddComment = () => {

    const mutationFn = async (comment) => api.post("/boardgames/" + comment.boardgameId + "/comment", comment)

    return useMutation(mutationFn, {
        onSuccess: (result, variables, context) => {
            queryClient.setQueryData(["boardgame", Number(variables.boardgameId)],
                boardgame => ({ ...boardgame, comments: boardgame.comments.concat(result) })
            )
        }
    }).mutateAsync
}

export default useAddComment