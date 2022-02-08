import { useQuery } from "react-query"
import api from "../services/api"
import useCurrentUser from "./useCurrentUser"

const sortByDate = (data) => data.sort((a, b) => new Date(b.date) - new Date(a.date))

const useActivities = () => {

    const { user } = useCurrentUser()

    const queryKey = ["activities"]

    const queryFn = async () => api.get("/activities")

    const { data, ...rest } = useQuery(queryKey, queryFn, {
        select: sortByDate,
        enabled: !!user?.token
    })

    return { activities: data, ...rest }
}

export default useActivities;