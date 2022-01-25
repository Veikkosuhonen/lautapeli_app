import { useQuery } from "react-query"
import api from "../services/api"

const useBoardgame = (id) => {

    const queryKey = ["boardgame", Number(id)]

    const queryFn = async () => api.get("/boardgames/" + id)

    const { data, ...rest } = useQuery(queryKey, queryFn)

    return { boardgame: data, ...rest }
}

export default useBoardgame;