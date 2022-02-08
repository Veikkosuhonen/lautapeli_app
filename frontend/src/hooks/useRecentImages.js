import { useQuery } from "react-query"
import api from "../services/api"

const useRecentImages = () => {

    const queryKey = ["recentImages"]

    const queryFn = async () => api.get("/images/recent")

    const { data, ...rest } = useQuery(queryKey, queryFn)

    return { images: data, ...rest }
}

export default useRecentImages;