import { useQuery } from "react-query"
import api from "../services/api"

const useCommits = () => {

    const queryKey = ["commits"]

    const queryFn = async () => api.get("/commits")

    const { data, ...rest } = useQuery(queryKey, queryFn)

    return { commits: data, ...rest }
}

export default useCommits;