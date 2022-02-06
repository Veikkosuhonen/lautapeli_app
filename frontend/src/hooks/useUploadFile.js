import { useMutation } from "react-query"
import api from "../services/api"
import queryClient from "../services/queryClient"
import s3 from "../services/s3"

const useUploadImage = () => {

    const mutationFn = async (image) => {
        const data = await api.get("/upload/boardgame?id=" + image.boardgameId + "&fileType=" + image.file.type)
        try {
            await s3.putObject(data.url, image.file)
        } catch (error) {
            console.log(error)
            throw error
        }
        return api.post("/upload/boardgame?id=" + image.boardgameId, { imageName: data.imageName, description: image.description })
    }

    return useMutation(mutationFn, {
        onSuccess: (result, variables, context) => {
            queryClient.setQueryData(["boardgame", Number(variables.boardgameId)],
                boardgame => ({ ...boardgame, images: boardgame.images.concat(result) })
            )
        }
    }).mutateAsync
}

export default useUploadImage