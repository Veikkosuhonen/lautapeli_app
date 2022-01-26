import { useMutation } from "react-query"
import api from "../services/api"
import queryClient from "../services/queryClient"

const useGenerateCode = () => {

    const mutationFn = async () => api.post("/admin/codes")

    const updateFn = (result) => (codes) => codes.concat(result)

    return useMutation(mutationFn, {
        onSuccess: (result, variables, context) => {
            queryClient.setQueryData("codes", updateFn(result))
        }
    }).mutateAsync
}

export default useGenerateCode