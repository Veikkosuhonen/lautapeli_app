import { useQuery } from "react-query"
import api from "../services/api"

const useBoardgame = (id, options) => {

    const queryKey = ["boardgame", Number(id)]

    const queryFn = async () => api.get("/boardgames/" + id)

    const { data, ...rest } = useQuery(queryKey, queryFn, options)

    return { boardgame: data, ...rest }
}

export default useBoardgame;