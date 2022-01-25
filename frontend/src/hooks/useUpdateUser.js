import { useMutation } from "react-query"
import queryClient from "../services/queryClient"
import api from "../services/api"

const useUpdateUser = () => {

    const mutationFn = async (user) => api.put("/users", user)

    return useMutation(mutationFn, {
        onSuccess: (result, variables, context) => {
            queryClient.setQueryData("users",
                users => users.concat(result)
            )
        }
    }).mutateAsync
}

export default useUpdateUser