import { useQuery } from "react-query"
import api from "../services/api"

const useCodes = () => {

    const queryKey = ["codes"]

    const queryFn = async () => api.get("/admin/codes")

    const { data, ...rest } = useQuery(queryKey, queryFn)

    return { codes: data, ...rest }
}

export default useCodes;