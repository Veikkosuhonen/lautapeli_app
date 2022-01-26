import { useMutation } from "react-query"
import api from "../services/api"
import queryClient from "../services/queryClient"

const useDeletePlaySession = () => {

    const mutationFn = async (playSession) => api.del("/playsessions/" + playSession.id)

    const updateFn = (result) => (boardgame) => { 
        return {
            ...boardgame,
            playSessions: boardgame.playSessions?.filter(playSession => playSession.id !== result.id)
        }
    }

    return useMutation(mutationFn, {
        onSuccess: (result, variables, context) => {
            queryClient.setQueryData(["boardgame", Number(result.boardgameId)], updateFn(result))
        }
    }).mutateAsync
}

export default useDeletePlaySession