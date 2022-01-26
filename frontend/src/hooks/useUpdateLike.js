import { useMutation } from "react-query"
import api from "../services/api"
import queryClient from "../services/queryClient"

const useUpdateLike = () => {

    const mutationFn = async (like) => api.post("/boardgames/" + like.boardgameId + "/like", like)

    return useMutation(mutationFn, {
        onSuccess: (result, variables, context) => {
            queryClient.setQueryData(["boardgame", Number(variables.boardgameId)],
                boardgame => {
                    let likes = boardgame.likes
                    if (result.like) {
                        likes = likes.concat({ id: result.userId })
                    } else {
                        likes = likes.filter(like => like.id !== result.userId)
                    }
                    return { ...boardgame, likes }
                }
            )
        }
    }).mutateAsync
}

export default useUpdateLike