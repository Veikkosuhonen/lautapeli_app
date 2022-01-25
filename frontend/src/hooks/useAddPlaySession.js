import { useMutation } from "react-query"
import api from "../services/api"
import queryClient from "../services/queryClient"

const useAddPlaySession = () => {

    const mutationFn = async (playSession) => api.post("/playsessions", playSession)

    return useMutation(mutationFn, {
        onSuccess: (result, variables, context) => {
            queryClient.setQueryData(["boardgame", Number(variables.boardgameId)],
                result.boardgame
            )
            queryClient.setQueryData("activities",
                activities => [result.activity].concat(activities)
            )
        }
    }).mutateAsync
}

export default useAddPlaySession