import { useQuery } from "react-query"
import api from "../services/api"

const useBoardgames = () => {

    const queryKey = ["boardgames"]

    const queryFn = async () => api.get("/boardgames")

    const { data, ...rest } = useQuery(queryKey, queryFn)

    return { boardgames: data, ...rest }
}

export default useBoardgames;