import { useMutation } from "react-query"
import api from "../services/api"
import queryClient from "../services/queryClient"

const useUpdateDescription = () => {

    const mutationFn = async (boardgame) => api.put("/boardgames/" + boardgame.id, boardgame)

    return useMutation(mutationFn, {
        onSuccess: (result, variables, context) => {
            queryClient.setQueryData(["boardgame", Number(variables.id)],
                boardgame => ({ ...boardgame, description: result.description })
            )
        }
    }).mutateAsync
}

export default useUpdateDescription