import { useMutation } from "react-query"
import api from "../services/api"
import queryClient from "../services/queryClient"
import s3 from "../services/s3"

const useUploadImage = () => {

    const mutationFn = async (image) => {

        const apiUrl = "/upload/boardgame?boardgameId=" + image.boardgameId + "&fileType=" + image.file.type 
            + (image.playSessionId ? `&playSessionId=${image.playSessionId}` : "")

        const data = await api.get(apiUrl)

        try {
            await s3.putObject(data.url, image.file)
        } catch (error) {
            console.log(error)
            throw error
        }

        return api.post(apiUrl, { imageName: data.imageName, description: image.description })
    }

    return useMutation(mutationFn, {
        onSuccess: (result, variables, context) => {

            const boardgameKey = ["boardgame", Number(variables.boardgameId)]

            if (queryClient.getQueryData(boardgameKey)) 
                queryClient.setQueryData(boardgameKey,
                    boardgame => ({ ...boardgame, images: boardgame.images.concat(result) })
                )
            

            const playSessionKey = ["playSession", Number(variables.playSessionId)]

            if (variables.playSessionId && queryClient.getQueryData(playSessionKey))
                queryClient.setQueryData(playSessionKey,
                    playSession => ({ ...playSession, images: playSession.images.concat(result) })
                )
        }
    }).mutateAsync
}

export default useUploadImage