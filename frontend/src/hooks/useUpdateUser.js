import { useMutation } from "react-query"
import userService from "../services/userService"
import queryClient from "../services/queryClient"

const useUpdateUser = () => {
    return useMutation(userService.put, {
        onSuccess: (result, variables, context) => {
            queryClient.setQueryData("users",
                users => users.concat(result)
            )
        }
    }).mutateAsync
}

export default useUpdateUser