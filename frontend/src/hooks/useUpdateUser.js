import { useMutation } from "react-query"
import queryClient from "../services/queryClient"
import api from "../services/api"

const useUpdateUser = () => {

    const mutationFn = async (user) => api.put("/users/" + user.id, user)

    const updateFn = (result) => (users) => users.map(user => user.id === result.id ? result : user)

    return useMutation(mutationFn, {
        onSuccess: (result, variables, context) => {
            queryClient.setQueryData("users", updateFn(result))
        }
    }).mutateAsync
}

export default useUpdateUser