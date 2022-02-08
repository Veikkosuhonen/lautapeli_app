import { useQuery } from "react-query"
import api from "../services/api"
import useCurrentUser from "./useCurrentUser"

const useUsers = () => {

    const queryKey = ["users"]

    const { user } = useCurrentUser()

    const queryFn = async () => api.get("/users")

    const { data, ...rest } = useQuery(queryKey, queryFn, {
        enabled: !!user?.token
    })

    return { users: data, ...rest }
}

export default useUsers;