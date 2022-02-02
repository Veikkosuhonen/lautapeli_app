import { useQuery } from "react-query"
import api from "../services/api"

const usePlaySessions = () => {

    const queryKey = ["playSessions"]

    const queryFn = async () => api.get("/playsessions")

    const { data, ...rest } = useQuery(queryKey, queryFn)

    return { playSessions: data, ...rest }
}

export default usePlaySessions;