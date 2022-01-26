import { useMutation } from "react-query"
import api from "../services/api"
import queryClient from "../services/queryClient"

const useUpdateDescription = () => {

    const mutationFn = async (boardgame) => api.put("/boardgames/" + boardgame.id, boardgame)

    const updateFn = (result) => (boardgame) => ({ ...boardgame, description: result.description })

    return useMutation(mutationFn, {
        onSuccess: (result, variables, context) => {
            queryClient.setQueryData(["boardgame", Number(variables.id)], updateFn(result))
        }
    }).mutateAsync
}

export default useUpdateDescription