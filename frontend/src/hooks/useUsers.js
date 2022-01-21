import { useQuery } from "react-query"

import userService from "../services/userService"
import useCurrentUser from "./useCurrentUser"

const useUsers = () => {

    useCurrentUser()

    const queryKey = ["users"]

    const { data, ...rest } = useQuery(queryKey, userService.getAll)

    return { data, ...rest }
}

export default useUsers;