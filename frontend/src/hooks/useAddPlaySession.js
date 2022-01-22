import { useMutation } from "react-query"
import playSessionService from "../services/playSessionService"
import queryClient from "../services/queryClient"

const useAddPlaySession = () => {
    return useMutation(playSessionService.post, {
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