import { useMutation } from "react-query"
import queryClient from "../services/queryClient"
import api from "../services/api"

const useUpdateUser = () => {

    const mutationFn = async (user) => api.put("/users", user)

    const updateFn = (result) => (users) => users.concat(result)

    return useMutation(mutationFn, {
        onSuccess: (result, variables, context) => {
            queryClient.setQueryData("users", updateFn(result))
        }
    }).mutateAsync
}

export default useUpdateUser