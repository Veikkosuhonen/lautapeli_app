import { useQuery } from "react-query"
import api from "../services/api"

const useUsers = () => {

    const queryKey = ["users"]

    const queryFn = async () => api.get("/users")

    const { data, ...rest } = useQuery(queryKey, queryFn)

    return { users: data, ...rest }
}

export default useUsers;