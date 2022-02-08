import { useQuery } from "react-query"
import api from "../services/api"
import useCurrentUser from "./useCurrentUser"

const useBoardgames = () => {

    const queryKey = ["boardgames"]

    const { user } = useCurrentUser()

    const queryFn = async () => api.get("/boardgames")

    const { data, ...rest } = useQuery(
        queryKey, 
        queryFn,
        {
            enabled: !!user?.token
        }
    )

    return { boardgames: data, ...rest }
}

export default useBoardgames;