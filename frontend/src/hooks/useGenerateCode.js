import { useMutation } from "react-query"
import adminService from "../services/adminService"
import queryClient from "../services/queryClient"

const useGenerateCode = () => {
    return useMutation(adminService.genCode, {
        onSuccess: (result, variables, context) => {
            queryClient.setQueryData("codes",
                codes => codes.concat(result)
            )
        }
    }).mutateAsync
}

export default useGenerateCode