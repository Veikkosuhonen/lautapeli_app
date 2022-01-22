import { useQuery } from "react-query"

import userService from "../services/userService"

const useUsers = () => {

    const queryKey = ["users"]

    const { data, ...rest } = useQuery(queryKey, userService.getAll)

    return { users: data, ...rest }
}

export default useUsers;