import { useMutation } from "react-query"
import api from "../services/api"
import queryClient from "../services/queryClient"

const useGenerateCode = () => {

    const mutationFn = async () => api.post("/admin/codes")

    return useMutation(mutationFn, {
        onSuccess: (result, variables, context) => {
            queryClient.setQueryData("codes",
                codes => codes.concat(result)
            )
        }
    }).mutateAsync
}

export default useGenerateCode