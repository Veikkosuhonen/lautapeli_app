import { useMutation } from "react-query"
import boardgameService from "../services/boardgameService"
import queryClient from "../services/queryClient"

const useUpdateDescription = () => {
    return useMutation(boardgameService.put, {
        onSuccess: (result, variables, context) => {
            queryClient.setQueryData(["boardgame", Number(variables.id)],
                boardgame => ({ ...boardgame, description: result.description })
            )
        }
    }).mutateAsync
}

export default useUpdateDescription